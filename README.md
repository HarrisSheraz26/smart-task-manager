# Smart Task Manager

A full‑stack productivity application built as a **professional portfolio project**. This repository documents **every step of the build**, including setup decisions, errors encountered, fixes applied, and lessons learned.

---

## Project Goals

* Build a production‑style **full‑stack web application**
* Demonstrate real backend + database skills
* Use industry‑standard tooling (Node.js, PostgreSQL, Prisma)
* Document **real developer issues**, not just happy paths

---

## Tech Stack (So Far)

### Backend

* Node.js
* npm
* PostgreSQL 18
* Prisma ORM

### Tooling

* Visual Studio Code
* GitHub Desktop
* pgAdmin 4
* SQL Shell (psql)

---

## Project Structure

```
smart-task-manager/
├── server/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   ├── package.json
│   └── prisma.config.ts
├── README.md
```

---

## STEP 1 — Project & Environment Setup

### Actions

* Created GitHub repository
* Cloned repository locally using GitHub Desktop
* Opened project in Visual Studio Code

### Issues Encountered

* GitHub vs GitHub Desktop confusion

### Resolution

* Clarified correct workflow:

  * GitHub (website) → repo creation
  * GitHub Desktop → cloning & commits
  * VS Code → all development work

---

## STEP 2 — Backend Initialization

### Actions

```bash
cd server
npm init -y
```

### Outcome

* `package.json` successfully created
* Confirmed Node.js and npm were working

---

## STEP 3 — Prisma Setup

### Actions

```bash
npx prisma init
```

### Outcome

* `prisma/schema.prisma` created
* `.env` file created
* Prisma configuration initialized

---

## STEP 4 — PostgreSQL Installation (Major Side Quest)

### Environment

* Windows OS
* PostgreSQL 18
* Custom port: **2707**

### Initial Problem

```text
'psql' is not recognized as an internal or external command
```

### Root Cause

* PostgreSQL installed, but **not added to PATH**

### Fix

* Added:

```
C:\Program Files\PostgreSQL\18\bin
```

* Restarted system

### Verification

```bash
psql --version
```

---

## STEP 5 — PostgreSQL Authentication Issues (Critical Learning)

### Symptoms

* pgAdmin could not connect
* SQL Shell rejected empty password
* Prisma unable to connect

### Errors Seen

```text
FATAL: password authentication failed for user "postgres"
fe_sendauth: no password supplied
```

### Root Cause

* PostgreSQL configured to require password authentication
* No usable password set during installation

---

## STEP 6 — Service & Permission Issues

### Problems

* PostgreSQL service could not be restarted via Services UI
* Restart option greyed out

### Resolution

Restarted service via **Administrator Command Prompt**:

```bat
net stop postgresql-x64-18
net start postgresql-x64-18
```

---

## STEP 7 — Authentication Recovery (Advanced)

### Actions

* Logged into PostgreSQL via `psql`
* Manually set password

```sql
ALTER USER postgres WITH PASSWORD 'MyStrongPass123!';
```

### Result

* Authentication restored
* pgAdmin, psql, and Prisma now functional

---

## STEP 8 — Database Creation

```sql
CREATE DATABASE smart_task_manager;
```

Confirmed database exists and is accessible.

---

## STEP 9 — Prisma Schema

### Models

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

---

## STEP 10 — Prisma Migration

```bash
npx prisma migrate dev --name init
```

### Outcome

* Database schema applied
* Prisma Client generated
* Backend officially connected to a real database

---

## Key Lessons Learned

* Environment setup is part of real development
* Windows database auth can be non‑trivial
* Knowing **how to recover**, not just install, is a real skill
* Debugging systematically beats guessing

---

## Why This README Exists

This documentation proves:

* Real problem‑solving ability
* Comfort with backend infrastructure
* Willingness to document and reflect

> Most portfolios show success. This one shows **process**.

---

## Next Steps

* Build Express server
* Integrate Prisma client
* Implement authentication (JWT + bcrypt)
* Add task CRUD endpoints

*(This README will continue to grow as the project evolves.)*
