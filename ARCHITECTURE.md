# JTask Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│                     (Next.js Frontend)                      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Pages      │  │  Components  │  │   Stores     │    │
│  │              │  │              │  │              │    │
│  │ - /login     │  │ - LoginForm  │  │ - auth       │    │
│  │ - /register  │  │ - Dashboard  │  │ - category   │    │
│  │ - /dashboard │  │ - TaskItem   │  │ - task       │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │            │
│         └──────────────────┴──────────────────┘            │
│                            │                               │
│                    ┌───────▼───────┐                      │
│                    │   API Client   │                      │
│                    │  (/lib/api.ts) │                      │
│                    └───────┬────────┘                      │
└────────────────────────────┼──────────────────────────────┘
                             │
                    HTTP/JSON + JWT Bearer Token
                             │
┌────────────────────────────▼──────────────────────────────┐
│                     Application Layer                      │
│                    (Axiom Framework)                       │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ Controllers  │  │   Services   │  │ Repositories │   │
│  │              │  │              │  │              │   │
│  │ - Auth       │◄─┤ - Auth       │◄─┤ - User      │   │
│  │ - Category   │◄─┤ - Category   │◄─┤ - Category  │   │
│  │ - Task       │◄─┤ - Task       │◄─┤ - Task      │   │
│  └──────────────┘  └──────────────┘  └──────┬───────┘   │
│                                               │           │
│  ┌──────────────┐  ┌──────────────┐         │           │
│  │  Middleware  │  │   Security   │         │           │
│  │              │  │              │         │           │
│  │ - CORS       │  │ - JwtUtil    │         │           │
│  │ - Auth       │  │ - BCrypt     │         │           │
│  └──────────────┘  └──────────────┘         │           │
└─────────────────────────────────────────────┼───────────┘
                                              │
                                      JDBC Connection
                                       (HikariCP Pool)
                                              │
┌─────────────────────────────────────────────▼───────────┐
│                     Data Layer                           │
│                  (PostgreSQL @ Neon)                     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │    users     │  │  categories  │  │    tasks     │ │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤ │
│  │ id (PK)      │  │ id (PK)      │  │ id (PK)      │ │
│  │ name         │  │ user_id (FK) │◄─┤ user_id (FK) │ │
│  │ email        │  │ name         │  │ category_id  │ │
│  │ password     │  │ color        │  │ title        │ │
│  │ created_at   │  │ icon         │  │ description  │ │
│  └──────────────┘  └──────────────┘  │ status       │ │
│                                       │ priority     │ │
│                                       │ due_date     │ │
│                                       │ created_at   │ │
│                                       └──────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Request Flow Example

### Creating a Task

```
1. USER ACTION
   │
   ├─ User clicks "Create Task" button
   │
   └─► UI shows TaskModal form

2. FORM SUBMISSION
   │
   ├─ User fills: { title, description, categoryId, priority, dueDate }
   │
   ├─ React Hook Form validates
   │
   └─► Calls: useTaskStore.addTask({ ... })

3. STORE LAYER (category.store.ts)
   │
   ├─ async addTask(input) {
   │     const created = await taskApi.create(input)
   │     set({ tasks: [...tasks, created] })
   │     toast.success("Task created")
   │   }
   │
   └─► Calls: taskApi.create({ ... })

4. API CLIENT (/lib/api.ts)
   │
   ├─ async create(data) {
   │     headers = {
   │       'Content-Type': 'application/json',
   │       'Authorization': 'Bearer ' + getTokenFromLocalStorage()
   │     }
   │     const response = await fetch('http://localhost:8081/api/tasks', {
   │       method: 'POST',
   │       headers,
   │       body: JSON.stringify(data)
   │     })
   │     return handleResponse(response)
   │   }
   │
   └─► HTTP POST to backend

5. AXIOM SERVER (TaskController.java)
   │
   ├─ @POST("/api/tasks")
   │   public void create(Context ctx) {
   │     String userId = getUserIdFromToken(ctx)
   │     CreateTaskRequest req = ctx.body(CreateTaskRequest.class)
   │
   │     Task task = taskService.create(userId, req)
   │
   │     ctx.status(201).json(TaskResponse.from(task))
   │   }
   │
   └─► Calls: TaskService.create()

6. SERVICE LAYER (TaskService.java)
   │
   ├─ public Task create(String userId, CreateTaskRequest req) {
   │     LocalDate dueDate = parseDate(req.dueDate())
   │
   │     Task task = taskRepository.create(
   │       UUID.fromString(userId),
   │       req.title(),
   │       req.description(),
   │       req.status(),
   │       req.priority(),
   │       req.categoryId() ? UUID.fromString(req.categoryId()) : null,
   │       dueDate
   │     )
   │
   │     return task
   │   }
   │
   └─► Calls: TaskRepository.create()

7. REPOSITORY LAYER (TaskRepository.java)
   │
   ├─ public Task create(...) {
   │     String sql = """
   │       INSERT INTO tasks (id, user_id, category_id, title, ...)
   │       VALUES (?, ?, ?, ?, ...)
   │       RETURNING *
   │     """
   │
   │     Task task = jdbcTemplate.queryForObject(sql, rowMapper, ...)
   │     return task
   │   }
   │
   └─► Executes SQL via JDBC

8. DATABASE (PostgreSQL @ Neon)
   │
   ├─ BEGIN TRANSACTION
   ├─ INSERT INTO tasks (...) VALUES (...)
   ├─ COMMIT
   │
   └─► Returns: { id, user_id, title, ..., created_at }

9. RESPONSE FLOW (Reverse)
   │
   ├─ Task → TaskResponse.from(task)
   ├─ JSON: { "id": "...", "title": "...", ... }
   ├─ HTTP 201 Created
   │
   └─► Frontend receives response

10. UI UPDATE
    │
    ├─ Store adds task to state: [...tasks, created]
    ├─ React re-renders Dashboard
    ├─ Task appears in list
    │
    └─► Toast notification: "Task created successfully ✓"
```

## Technology Stack

### Frontend

- **Framework**: Next.js 16.1.3 (React 19.2.3)
- **Language**: TypeScript 5.7.3
- **State Management**: Zustand 5.0.10
- **Form Handling**: React Hook Form 7.54.2
- **UI Components**: Radix UI + Tailwind CSS
- **Notifications**: Sonner 2.0.7
- **Icons**: Lucide React 0.468.0
- **HTTP Client**: Native Fetch API

### Backend

- **Framework**: Axiom v0.1.4
- **Language**: Java 25 (compiled to Java 21 target)
- **Build Tool**: Maven 3.9+
- **Database Driver**: PostgreSQL JDBC
- **Connection Pool**: HikariCP
- **Auth**: JWT (java-jwt 4.4.0)
- **Password**: BCrypt (jBCrypt 0.4)
- **HTTP Server**: Axiom Core (Virtual Threads)

### Database

- **DBMS**: PostgreSQL 16
- **Host**: Neon Cloud (ap-southeast-1)
- **Connection**: Pooled via HikariCP
- **Schema**: Managed via schema.sql

## Security Implementation

### Authentication Flow

```
1. User Registration
   ├─ Password → BCrypt.hashpw(password, BCrypt.gensalt())
   ├─ Stored: { email, name, password_hash }
   └─ Response: 201 Created

2. User Login
   ├─ Input: { email, password }
   ├─ Verify: BCrypt.checkpw(password, stored_hash)
   ├─ Generate: JWT.create()
   │           .withSubject(userId)
   │           .withClaim("email", email)
   │           .withExpiresAt(now + 24h)
   │           .sign(HMAC256(secret))
   │
   └─ Response: { user: {...}, token: "eyJhbGc..." }

3. Protected Request
   ├─ Header: Authorization: Bearer eyJhbGc...
   ├─ Extract: token from "Bearer <token>"
   ├─ Verify: JWT.require(HMAC256(secret)).build().verify(token)
   ├─ Extract: userId from token.getSubject()
   │
   └─ Use: userId for database queries (WHERE user_id = ?)
```

### CORS Configuration

```java
cors.origins = http://localhost:3000
```

Allows:

- GET, POST, PUT, DELETE methods
- Authorization, Content-Type headers
- Credentials (cookies, auth headers)

## Data Model

### Entity Relationships

```
users (1) ──────────────┬─────── (N) categories
                        │
                        └─────── (N) tasks

categories (1) ─────────────── (N) tasks
```

### Constraints

- `users.email`: UNIQUE, NOT NULL
- `categories.user_id`: FK → users.id (CASCADE DELETE)
- `tasks.user_id`: FK → users.id (CASCADE DELETE)
- `tasks.category_id`: FK → categories.id (SET NULL)

## API Endpoints

### Public Endpoints

```
POST /api/auth/register
POST /api/auth/login
```

### Protected Endpoints (Require JWT)

```
GET    /api/categories          - List user's categories
POST   /api/categories          - Create category
PUT    /api/categories/:id      - Update category
DELETE /api/categories/:id      - Delete category

GET    /api/tasks               - List user's tasks (optional ?categoryId=X)
POST   /api/tasks               - Create task
PUT    /api/tasks/:id           - Update task
DELETE /api/tasks/:id           - Delete task
```

## State Management

### Auth Store (Zustand + Persist)

```typescript
{
  user: { id, name, email } | null,
  token: string | null,
  login: (email, password) => Promise<void>,
  register: (name, email, password) => Promise<void>,
  logout: () => void
}
```

**Persisted to**: `localStorage['auth-storage']`

### Category Store (Zustand)

```typescript
{
  categories: Category[],
  isLoading: boolean,
  fetchCategories: () => Promise<void>,
  addCategory: (data) => Promise<void>,
  updateCategory: (id, data) => Promise<void>,
  deleteCategory: (id) => Promise<void>
}
```

**Persisted to**: Backend only (no localStorage)

### Task Store (Zustand)

```typescript
{
  tasks: Task[],
  isLoading: boolean,
  searchQuery: string,
  selectedCategoryId: string | null,
  fetchTasks: (categoryId?) => Promise<void>,
  addTask: (data) => Promise<void>,
  updateTask: (id, data) => Promise<void>,
  deleteTask: (id) => Promise<void>,
  toggleTaskStatus: (id) => Promise<void>,
  setSearchQuery: (query) => void,
  setSelectedCategoryId: (id) => void
}
```

**Persisted to**: Backend only (no localStorage)

## Environment Configuration

### Backend (.env)

```env
database.url=jdbc:postgresql://ep-autumn-resonance-a1hlr27o-pooler.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require
database.user=neondb_owner
database.password=***
jwt.secret=your-secret-key-min-256-bits
server.port=8081
cors.origins=http://localhost:3000
```

### Frontend (hardcoded in /lib/api.ts)

```typescript
const API_BASE_URL = 'http://localhost:8081/api';
```

**Recommendation**: Move to environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

## Deployment Considerations

### Backend

- ✅ Compile to JAR: `mvn clean package`
- ✅ Run: `java -jar target/jtask-backend.jar`
- ✅ Environment: Set via env vars or .env file
- ✅ Port: Configurable via `server.port`
- ✅ Database: Neon PostgreSQL (cloud-hosted)

### Frontend

- ✅ Build: `pnpm build`
- ✅ Start: `pnpm start` (production mode)
- ✅ SSR: Fully supported (no window/localStorage on server)
- ✅ Static: Can export with `next export` if needed

### Production Checklist

- [ ] Use HTTPS in production
- [ ] Update CORS to production domain
- [ ] Use environment variables for all secrets
- [ ] Enable CSRF protection
- [ ] Add rate limiting
- [ ] Set up monitoring (logs, metrics)
- [ ] Database connection pooling configured
- [ ] JWT secret is strong (256+ bits)
- [ ] Enable HTTP/2
- [ ] Add health check endpoint

## Performance Optimizations

### Frontend

- ✅ React Server Components for static content
- ✅ Client Components only where needed ('use client')
- ✅ Lazy loading for heavy components
- ✅ Zustand for minimal re-renders
- ✅ React Hook Form (uncontrolled forms)

### Backend

- ✅ Virtual Threads (Java 25) for high concurrency
- ✅ HikariCP connection pooling
- ✅ Prepared statements (prevent SQL injection + performance)
- ✅ Single-query operations (no N+1 problems)

### Database

- ✅ Indexes on foreign keys (user_id, category_id)
- ✅ Index on users.email (for login lookups)
- ✅ Connection pooling (HikariCP)

---

**Status**: Production-ready for university demo! 🚀
**Last Updated**: January 2025
