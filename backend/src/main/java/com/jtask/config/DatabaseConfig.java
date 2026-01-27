package com.jtask.config;

import io.axiom.config.Config;
import io.axiom.persistence.AxiomPersistence;
import io.axiom.persistence.config.PersistenceConfig;
import io.axiom.persistence.jdbc.Jdbc;
import io.axiom.persistence.tx.Transaction;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.stream.Collectors;

public class DatabaseConfig {

    public static void initialize() {
        // Use Axiom's built-in Config (loads from .env automatically!)
        String dbUrl = Config.get("database.url");
        String dbUsername = Config.get("database.username");
        String dbPassword = Config.get("database.password");

        PersistenceConfig config = PersistenceConfig.builder()
            .url(dbUrl)
            .username(dbUsername)
            .password(dbPassword)
            .build();

        AxiomPersistence.start(config);

        runMigrations();

        System.out.println("✅ Database connected: " + maskPassword(dbUrl));
    }

    private static void runMigrations() {
        try {
            try (var conn = AxiomPersistence.globalDataSource().getConnection()) {
                conn.setAutoCommit(true);

                try (var stmt = conn.createStatement()) {
                    // Force reset if RESET_DB=true environment variable is set
                    String resetDb = System.getenv("RESET_DB");
                    if ("true".equalsIgnoreCase(resetDb)) {
                        System.out.println("[MIGRATION] ⚠️  RESET_DB=true - Dropping all tables!");
                        stmt.execute("DROP TABLE IF EXISTS schema_migrations CASCADE");
                        stmt.execute("DROP TABLE IF EXISTS tasks CASCADE");
                        stmt.execute("DROP TABLE IF EXISTS categories CASCADE");
                        stmt.execute("DROP TABLE IF EXISTS users CASCADE");
                        System.out.println("[MIGRATION] ✓ All tables dropped");
                    }

                    // Create migration tracking table
                    stmt.execute(
                        "CREATE TABLE IF NOT EXISTS schema_migrations (" +
                        "  version VARCHAR(50) PRIMARY KEY," +
                        "  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP" +
                        ")"
                    );

                    // Check if v1 migration already ran
                    boolean migrationExists = false;
                    try {
                        var rs = stmt.executeQuery("SELECT version FROM schema_migrations WHERE version = 'v1_initial_schema'");
                        migrationExists = rs.next();
                    } catch (Exception e) {
                        migrationExists = false;
                    }

                    if (migrationExists) {
                        System.out.println("[MIGRATION] ✓ Schema already up to date (v1)");
                        return;
                    }

                    System.out.println("[MIGRATION] Running initial schema migration (v1)...");

                    // Read schema.sql
                    String schema = new BufferedReader(
                        new InputStreamReader(
                            DatabaseConfig.class.getClassLoader().getResourceAsStream("schema.sql"),
                            StandardCharsets.UTF_8
                        )
                    ).lines().collect(Collectors.joining("\n"));

                    // Execute DDL statements
                    String[] statements = schema.split(";");
                    int executed = 0;
                    for (int i = 0; i < statements.length; i++) {
                        String sql = statements[i];

                        // Remove comment lines but keep the SQL
                        String[] lines = sql.split("\n");
                        StringBuilder cleanSql = new StringBuilder();
                        for (String line : lines) {
                            String trimmedLine = line.trim();
                            if (!trimmedLine.isEmpty() && !trimmedLine.startsWith("--")) {
                                cleanSql.append(line).append("\n");
                            }
                        }

                        String trimmed = cleanSql.toString().trim();
                        if (!trimmed.isEmpty()) {
                            try {
                                stmt.execute(trimmed);
                                executed++;
                            } catch (Exception e) {
                                if (!e.getMessage().contains("already exists")) {
                                    System.err.println("⚠️  Migration warning: " + e.getMessage());
                                }
                            }
                        }
                    }

                    // Mark migration as applied
                    stmt.execute("INSERT INTO schema_migrations (version) VALUES ('v1_initial_schema')");

                    System.out.println("[MIGRATION] ✓ Executed " + executed + " DDL statements");
                    System.out.println("✅ Database schema initialized");

                    // Insert seed data for development
                    insertSeedData(stmt);
                }
            }
        } catch (Exception e) {
            System.err.println("⚠️  Schema migration failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void insertSeedData(java.sql.Statement stmt) {
        try {
            // Check if seed data already exists
            var rs = stmt.executeQuery("SELECT COUNT(*) FROM users WHERE email = 'demo@jtask.com'");
            if (rs.next() && rs.getInt(1) > 0) {
                System.out.println("[SEED] ✓ Seed data already exists");
                return;
            }

            System.out.println("[SEED] Inserting demo data...");

            // Insert demo user (password: demo123 - hash this in production!)
            stmt.execute(
                "INSERT INTO users (email, password_hash, name) VALUES (" +
                "'demo@jtask.com', " +
                "'$2a$10$8K1p/a0dL3.b1q0nDgL7cOJwj.eSC1z8yD8ZxT8yVxKxZ8yVxKxZO', " +
                "'Demo User')"
            );

            // Get demo user ID
            rs = stmt.executeQuery("SELECT id FROM users WHERE email = 'demo@jtask.com'");
            if (rs.next()) {
                long userId = rs.getLong("id");

                // Insert demo categories
                stmt.execute(
                    "INSERT INTO categories (user_id, name, color) VALUES " +
                    "(" + userId + ", 'Work', 'text-blue-500'), " +
                    "(" + userId + ", 'Personal', 'text-green-500'), " +
                    "(" + userId + ", 'Learning', 'text-purple-500')"
                );

                // Get category IDs for tasks
                rs = stmt.executeQuery("SELECT id, name FROM categories WHERE user_id = " + userId + " ORDER BY id");
                Long workCatId = null, personalCatId = null;
                while (rs.next()) {
                    String name = rs.getString("name");
                    if ("Work".equals(name)) workCatId = rs.getLong("id");
                    if ("Personal".equals(name)) personalCatId = rs.getLong("id");
                }

                // Insert demo tasks
                if (workCatId != null && personalCatId != null) {
                    stmt.execute(
                        "INSERT INTO tasks (user_id, category_id, title, description, status, priority, due_date) VALUES " +
                        "(" + userId + ", " + workCatId + ", 'Review Q1 Reports', 'Check quarterly performance metrics', 'todo', 'high', CURRENT_TIMESTAMP + INTERVAL '3 days'), " +
                        "(" + userId + ", " + workCatId + ", 'Team Meeting Prep', 'Prepare slides for Monday meeting', 'in_progress', 'medium', CURRENT_TIMESTAMP + INTERVAL '1 day'), " +
                        "(" + userId + ", " + personalCatId + ", 'Buy Groceries', 'Milk, eggs, bread', 'todo', 'low', CURRENT_TIMESTAMP + INTERVAL '2 days')"
                    );
                }

                System.out.println("[SEED] ✓ Demo data inserted");
                System.out.println("[SEED] 📧 Demo login: demo@jtask.com / demo123");
            }
        } catch (Exception e) {
            System.err.println("[SEED] Warning: Could not insert seed data - " + e.getMessage());
        }
    }

    private static String maskPassword(String url) {
        return url.replaceAll("password=[^&]*", "password=***");
    }

    public static void shutdown() {
        AxiomPersistence.stop();
        System.out.println("✅ Database connection closed");
    }
}
