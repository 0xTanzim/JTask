package com.jtask;

import com.jtask.config.DatabaseConfig;
import com.jtask.controller.AuthController;
import com.jtask.controller.CategoryController;
import com.jtask.controller.TaskController;
import io.axiom.config.Config;
import io.axiom.core.app.Axiom;
import io.axiom.core.app.App;
import io.axiom.core.routing.Router;

public class Main {
    public static void main(String[] args) {
        DatabaseConfig.initialize();

        AuthController authController = new AuthController();
        CategoryController categoryController = new CategoryController();
        TaskController taskController = new TaskController();

        Router router = new Router();

        // Auth routes
        router.post("/api/auth/register", authController::register);
        router.post("/api/auth/login", authController::login);

        // Category routes
        router.get("/api/categories", categoryController::getAll);
        router.post("/api/categories", categoryController::create);
        router.put("/api/categories/:id", categoryController::update);
        router.delete("/api/categories/:id", categoryController::delete);

        // Task routes
        router.get("/api/tasks", taskController::getAll);
        router.post("/api/tasks", taskController::create);
        router.put("/api/tasks/:id", taskController::update);
        router.delete("/api/tasks/:id", taskController::delete);

        App app = Axiom.create();

        // CORS middleware
        app.use(ctx -> {
            ctx.setHeader("Access-Control-Allow-Origin", Config.get("cors.origins", "*"));
            ctx.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            ctx.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

            if ("OPTIONS".equals(ctx.method())) {
                ctx.status(204);
                return;
            }

            ctx.next();
        });

        app.route(router);

        app.onShutdown(DatabaseConfig::shutdown);

        int port = Config.get("server.port", 8081);
        app.listen(port);

        System.out.println("🚀 JTask API running on http://localhost:" + port);
        System.out.println("📊 Using PostgreSQL (Neon)");
        System.out.println("🔐 Auth endpoints:");
        System.out.println("   POST /api/auth/register");
        System.out.println("   POST /api/auth/login");
        System.out.println("📁 Category endpoints:");
        System.out.println("   GET    /api/categories");
        System.out.println("   POST   /api/categories");
        System.out.println("   PUT    /api/categories/:id");
        System.out.println("   DELETE /api/categories/:id");
        System.out.println("📝 Task endpoints:");
        System.out.println("   GET    /api/tasks");
        System.out.println("   POST   /api/tasks");
        System.out.println("   PUT    /api/tasks/:id");
        System.out.println("   DELETE /api/tasks/:id");
    }
}
