# JTask - Task Management System

A full-stack task management application built with **Axiom Framework** (backend) and **Next.js** (frontend) for university demonstration.

## 🚀 Quick Start

### Prerequisites

- Java 21+ (Java 25 recommended)
- Node.js 18+
- pnpm
- Maven
- PostgreSQL database (we use Neon cloud)

### 1. Backend Setup

```bash
cd backend

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run the server
mvn compile exec:java
```

Backend runs on: **http://localhost:8081**

### 2. Frontend Setup

```bash
cd taskjet

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Frontend runs on: **http://localhost:3000**

### 3. Database Setup

The database schema is automatically created on first run via `/backend/src/main/resources/schema.sql`.

Tables created:

- `users` - User accounts
- `categories` - Task categories
- `tasks` - Tasks with status tracking

## 📋 Features

### ✅ Implemented

- User registration and authentication (JWT)
- Category management (CRUD)
- Task management (CRUD)
- Task filtering by category
- Task status updates (todo/in-progress/done)
- Priority levels (low/medium/high)
- Due date tracking
- Persistent state across page refreshes
- Toast notifications
- Responsive design
- SSR-safe implementation

## 🏗️ Architecture

```
Frontend (Next.js + React)
    ↓ HTTP/JSON + JWT
Backend (Axiom Framework)
    ↓ JDBC
Database (PostgreSQL @ Neon)
```

### Tech Stack

**Backend:**

- Axiom Framework v0.1.4
- Java 25
- PostgreSQL (JDBC)
- JWT Authentication
- BCrypt password hashing

**Frontend:**

- Next.js 16.1.3
- React 19.2.3
- TypeScript
- Zustand (state management)
- Tailwind CSS
- Radix UI components

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete system architecture
- [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md) - Frontend-Backend integration details
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Complete testing scenarios

## 🔑 API Endpoints

### Public

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Protected (JWT Required)

- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/tasks` - List tasks (optional ?categoryId filter)
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🧪 Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for complete testing scenarios.

Quick test:

```bash
# Test backend health
curl http://localhost:8081/health

# Register user
curl -X POST http://localhost:8081/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🛠️ Development

### Backend Development

```bash
cd backend
mvn compile exec:java
```

### Frontend Development

```bash
cd taskjet
pnpm dev
```

### Build for Production

**Backend:**

```bash
cd backend
mvn clean package
java -jar target/jtask-backend.jar
```

**Frontend:**

```bash
cd taskjet
pnpm build
pnpm start
```

## 🔒 Security

- Passwords hashed with BCrypt
- JWT tokens for authentication (24h expiry)
- CORS configured for localhost:3000
- SQL injection prevention via prepared statements
- XSS protection via React's built-in sanitization

## 📝 Environment Variables

### Backend (.env)

```env
database.url=jdbc:postgresql://...
database.user=your_user
database.password=your_password
jwt.secret=your-256-bit-secret
server.port=8081
cors.origins=http://localhost:3000
```

### Frontend

API URL is hardcoded in `/taskjet/src/lib/api.ts` to `http://localhost:8081/api`

## 🎯 Demo Flow

1. Open http://localhost:3000/register
2. Create a new account
3. Login with credentials
4. Create categories (Work, Personal, etc.)
5. Create tasks with priorities and due dates
6. Mark tasks as complete
7. Filter tasks by category
8. Refresh page - everything persists!

## 📦 Project Structure

```
JTask/
├── backend/              # Axiom Framework backend
│   ├── src/main/java/
│   │   └── com/jtask/
│   │       ├── Main.java           # Entry point
│   │       ├── controller/         # REST controllers
│   │       ├── service/            # Business logic
│   │       ├── repository/         # Database layer
│   │       ├── domain/             # Domain models
│   │       ├── dto/                # Request/Response DTOs
│   │       ├── security/           # JWT utilities
│   │       └── config/             # Configuration
│   └── src/main/resources/
│       ├── schema.sql              # Database schema
│       └── application.properties
│
└── taskjet/             # Next.js frontend
    ├── src/
    │   ├── app/                    # Next.js pages
    │   ├── components/             # Reusable UI components
    │   ├── features/               # Feature modules
    │   │   ├── auth/               # Authentication
    │   │   ├── category/           # Category management
    │   │   └── task/               # Task management
    │   └── lib/
    │       ├── api.ts              # API client
    │       └── utils.ts            # Utilities
    └── public/                     # Static assets
```

## 👥 Team

- **Backend**: Built with Axiom Framework
- **Frontend**: Built with Next.js by UI/UX team

## 📄 License

MIT License - See [LICENSE](./LICENSE) file

## 🙏 Acknowledgments

- Axiom Framework for providing a clean, modern Java framework
- Next.js team for excellent React framework
- Neon for cloud PostgreSQL hosting

---

**Status**: ✅ Production-ready for university demonstration

**Last Updated**: January 2025
