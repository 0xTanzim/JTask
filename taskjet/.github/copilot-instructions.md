---
description: "Copilot instructions for building a modern Todo Task Manager in Next.js (frontend-only, client state). Clean modular architecture, best practices."
applyTo: "**"
---

# ✅ Todo Task Manager – GitHub Copilot Instructions

You are a senior frontend engineer helping build a **modern Todo Task Manager** using **Next.js + TypeScript**.
We are building the **frontend first**, so all data is stored client-side (no database yet).

Your job is to generate **clean, modular, scalable** code with strong best practices.

---

## 1) Project Context

We are building a Todo app with these features:

### Task Features
- Add task
- Update task
- Delete task
- Category-based tasks
- Task status (done / pending)

### Category Features
- Create category
- Update category
- Delete category
- List categories

### Auth (Frontend only for now)
- Login
- Register
- Store token/session in client (temporary)
- Protect pages/routes on frontend

---

## 2) Core Principles

### ✅ Clean Code Rules
- Write **TypeScript only**
- Keep code **readable and explicit**
- Avoid clever hacks
- Avoid unnecessary abstraction
- Use meaningful naming (no short variable names like `x`, `tmp`, `data1`)

### ✅ File Size Rule
- **Max 200–250 LOC per file**
- If a file grows beyond that, split into:
  - components
  - hooks
  - utils
  - services
  - store modules

### ✅ Modularity
- Split by domain:
  - `task`
  - `category`
  - `auth`
- Code must be easy to move to backend later.

---

## 3) Tech Stack / Patterns

### Framework
- Next.js App Router
- TypeScript
- TailwindCSS
- Client-side state management: **Zustand**

### State Rules
- Store domain state in Zustand:
  - tasks store
  - categories store
  - auth store
- Store UI-only state locally:
  - modal open/close
  - input field state
  - dropdown open state

### Persistence
- Use `localStorage` persistence for:
  - tasks
  - categories
  - auth session
- Use Zustand `persist` middleware.
- All persistence logic must be isolated (no scattered localStorage access).

---

## 4) Architecture & Folder Structure

Follow this structure strictly:

```

src/
app/
(public)/
login/
register/
(protected)/
dashboard/
tasks/
categories/
features/
auth/
components/
hooks/
services/
store/
types/
utils/
task/
components/
hooks/
services/
store/
types/
utils/
category/
components/
hooks/
services/
store/
types/
utils/
components/
ui/
layout/
lib/
constants/
storage/
validators/
styles/

````

Rules:
- Feature code MUST live inside `features/*`
- Shared UI components go to `components/ui`
- No random `utils.ts` dumping file — split utilities by domain

---

## 5) Coding Standards

### Must Follow
- Use functional components only
- Prefer composition over inheritance
- Keep functions small (10–30 lines)
- Keep components small and focused

### Imports
- Use absolute imports
- Use consistent alias imports like:
  - `@/features/task/...`
  - `@/components/ui/...`

### TypeScript
- Strict typing
- No `any`
- Use proper type models:
  - `Task`
  - `Category`
  - `User`
- Use enums/unions for status and priority

Example:
```ts
export type TaskStatus = "todo" | "done";
export type TaskPriority = "low" | "medium" | "high";
````

---

## 6) UI/UX Rules

* Build modern UI (task manager style)
* Clear spacing and typography
* Keep UX smooth:

  * optimistic update when possible
  * confirm delete (modal/dialog)
  * show empty states
  * show loading states for transitions

---

## 7) Zustand Store Style

Stores must be consistent:

* store file name: `*.store.ts`
* action names must be clear:

  * `addTask`
  * `updateTask`
  * `deleteTask`
  * `addCategory`
  * `login`
  * `logout`

Store shape example:

```ts
type TaskStore = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, patch: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
};
```

Rules:

* Do not mutate objects directly unless safely using immutable patterns
* Store must not contain UI logic
* Keep business logic inside store or services, not components

---

## 8) Validation Rules

* Use `zod` validation for:

  * login/register form inputs
  * create/update task
  * create/update category
* Validation schema must live inside:

  * `lib/validators/*`
  * OR within the feature `validators.ts`

---

## 9) Auth Rules (Frontend-only)

For now:

* Register/Login will simulate auth
* Save user session in local storage
* Add a route guard wrapper for protected routes

Later:

* must be replaceable with backend auth easily

---

## 10) Error Handling

* Never fail silently
* Show user-friendly error messages
* Keep error boundaries clean
* Prefer:

  * `toast` notifications
  * inline error text for forms

---

## 11) Output Format Rules for Copilot

When generating code:

* Prefer complete files
* Ensure imports are correct
* Ensure typing is complete
* Include minimal comments only where necessary (explain WHY, not WHAT)

DO NOT:

* generate huge files beyond 250 LOC
* create duplicated logic across features
* mix UI + business logic in same file
* use JavaScript (TypeScript only)

---

## 12) Back-end Migration Readiness

We will add backend after a few days.
So design code to replace stores easily:

✅ Today:

* stores call local in-memory logic

✅ Later:

* services will call API endpoints
* store actions will call services

Keep this separation from day 1.

