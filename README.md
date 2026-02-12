# Smart Task Manager

A full‑stack productivity application built as a professional portfolio project. This repository documents the build process, setup decisions, errors encountered, fixes applied, and lessons learned.

> This README is intentionally detailed — it demonstrates real‑world debugging, system configuration, and problem‑solving useful for employers.
TypeScript warnings do not always indicate runtime failures

## Step 4 Status

- PostgreSQL connected
- Prisma schema migrated
- Prisma Client generated
- Express route querying database successfully
- No runtime crashes

Step 4 complete.

```bash
npm run dev
```

This resolved the issue immediately.


## Nodemon Behavior

### What was observed

Terminal showed repeated logs such as:

```text
[nodemon] restarting due to changes...
Server is running on port 5000
```

### Why this is normal

- Nodemon watches files for changes
- Saving `index.js` triggers an automatic restart
- Live reload confirms Nodemon is working correctly

No action required.

---

## Backend Verification

### Action taken

Opened the browser at `http://localhost:5000`.

### Result

The browser displayed:

```text
Smart Task Manager API is running
```

This confirms:

- Express server is running
- Routing responds
- Environment variables load correctly

---

## Questions & Answers

- **Is it normal that the terminal looks stuck?**
  - Yes — a running server waits for requests.
- **Did I make a mistake?**
  - No — issues were configuration-related and resolved.
- **Why does Nodemon keep restarting?**
  - Because file watching is enabled (development feature).

---

## Current State (Checkpoint)

- Express server running
- ES modules configured
- Environment variables loaded
- Nodemon live reload working
- API reachable in browser
- Errors documented and resolved

---

## Database Integration (PostgreSQL + Prisma)

### Objective

Connect the Express backend to PostgreSQL using Prisma and replace placeholder routes with real database queries.

### Goals

- Define a `Task` model
- Configure Prisma
- Generate and apply a migration
- Connect Prisma to the Express app
- Fetch data via `/tasks`

### Install & initialise Prisma

Commands used:

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

This generated:

- `prisma/schema.prisma`
- `.env`
- `prisma.config.ts`

### Defining the schema

Example `schema.prisma` model:

```prisma
model Task {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
}
```

Datasource example:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Run the migration

```bash
npx prisma migrate dev --name init_task_model
```

If you see an error about the `url` datasource property, update `prisma.config.ts` to modern Prisma configuration.

### Generate Prisma Client

```bash
npx prisma generate
```

Client will be available under `node_modules/@prisma/client`.

### Prisma client instance

Example `src/prisma.js`:

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

### Common issues & fixes

- Avoid passing unsupported options to `new PrismaClient()`; use the default constructor
- Install `@types/node` to address TypeScript `process` not found warnings

### Connecting to Express routes

Example `/tasks` route:

```js
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});
```

If the database has no records, `/tasks` will return `[]` — an empty array indicates a working route and connection.

---

## Final verification

Start the server:

```bash
cd server
npm run dev
```

Visit:

- `http://localhost:5000` → API running message
- `http://localhost:5000/tasks` → `[]` or task data

---

## Lessons learned

- Prisma v7 configuration differs from older tutorials
- Constructor overrides are rarely needed
- Blank JSON responses can still indicate success
- TypeScript warnings do not always indicate runtime failures

---

## Step 4 status

- PostgreSQL connected
- Prisma schema migrated
- Prisma Client generated
- Express route querying database successfully
- No runtime crashes

Development environment stable

Step 4 complete.
Server is running on port 5000
```

### Why This Is Normal

- Nodemon watches files for changes
- Saving `index.js` triggers a restart
- Live-reload confirms Nodemon is working as intended

No action required.

---

## Backend Verification

### Action Taken

Opened the browser at:

```
http://localhost:5000
```

### Result

The browser displayed:

```
Smart Task Manager API is running
```

This confirms the Express server is running, routing works, and environment variables are loading.

---

## Questions & Answers

### Is it normal that the terminal looks stuck?

Yes. A running server waits for requests — this is expected.

### Did I make a mistake?

No. The backend behaved as intended; issues were configuration-related.

### Why does Nodemon keep restarting?

Because file watching is enabled — it is a development feature.

---

## Current State (Checkpoint)

- Express server running
- ES Modules configured
- Environment variables loaded
- Nodemon live reload working
- API reachable in browser
- Documented errors and resolutions

---

## STEP 4 — Database Integration (PostgreSQL + Prisma)

### Objective

Connect the Express backend to PostgreSQL using Prisma and replace placeholder routes with real database queries.

### Goals

- Define a Task model
- Configure Prisma
- Generate and apply a migration
- Connect Prisma to the Express app
- Fetch data via `/tasks`

### Installing and Initialising Prisma

Commands used:

- `npm install prisma --save-dev`
- `npm install @prisma/client`
- `npx prisma init`

This generated:

- `prisma/schema.prisma`
- `.env`
- `prisma.config.ts`

### Defining the Database Schema

Example model added to `schema.prisma`:

```prisma
model Task {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
}
```

Datasource configured for PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Running the First Migration

Command:

```bash
npx prisma migrate dev --name init_task_model
```

If you see an error about the `url` datasource property, update `prisma.config.ts` and follow modern Prisma configuration practices.

### Generating Prisma Client

```bash
npx prisma generate
```

Prisma Client will be available under `node_modules/@prisma/client`.

### Creating Prisma Client Instance

Example `src/prisma.js`:

```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
```

### Common Issues & Fixes

- Do not pass unsupported options to `new PrismaClient()`; prefer the default constructor.
- Install `@types/node` to address TypeScript `process` not found warnings.

### Connecting Prisma to Express Routes

Example `/tasks` route:

```js
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});
```

If the database has no records, `/tasks` will return `[]` — an empty array indicates the route and connection are working.

### Final Verification

```bash
npm run dev
```

Visit:

- `http://localhost:5000` → API running message
- `http://localhost:5000/tasks` → `[]` or task data

### Lessons Learned

- Prisma v7 configuration differs from older tutorials
- Constructor overrides are rarely needed
- Blank JSON responses can still indicate success
- TypeScript warnings do not always indicate runtime failures

### Step 4 Status

- PostgreSQL connected
- Prisma schema migrated
- Prisma Client generated
- Express route querying database successfully
- No runtime crashes

Step 4 complete.

npm run dev
```

This resolved the issue immediately.

---

## 🔁 Nodemon Behavior Explained (Not a Bug)

### What Was Observed

Terminal showed repeated logs such as:

```
[nodemon] restarting due to changes...
Server is running on port 5000
```

### ✅ Why This Is Normal

* Nodemon **watches files** for changes
* Any save in `index.js` triggers an automatic restart
* This confirms live-reload is working correctly

No action required.

---

## 🌐 Backend Verification (Success Check)

### Action Taken

Opened browser and visited:

```
http://localhost:5000
```

### Result

The browser displayed:

```
Smart Task Manager API is running
```

✅ This confirms:

* Express server is running
* Port binding works
* Routing works
* Environment variables are loading

---

## ❓ Questions Asked & Answers Learned

### ❓ "Is it normal that the terminal looks stuck?"

✅ Yes.

* A running server *waits for requests*
* This is expected backend behavior

---

### ❓ "Did I make a mistake?"

✅ No.

* The backend is behaving exactly as intended
* Errors encountered were configuration-related, not logic errors

---

### ❓ "Why does Nodemon keep restarting?"

✅ Because file watching is enabled.

* This is a **feature**, not a bug
* Essential for fast development

---

## 📌 Current State (Checkpoint)

At the end of Step 3:

* ✅ Express server running
* ✅ ES Modules correctly configured
* ✅ Environment variables loaded
* ✅ Nodemon live reload working
* ✅ API reachable in browser
* ✅ All errors resolved and documented

---

STEP 4 — Database Integration (PostgreSQL + Prisma)
Objective

Connect the Express backend to a PostgreSQL database using Prisma ORM and replace placeholder routes with real database queries.

The goal was to:

Define a Task model

Configure Prisma properly

Generate and apply a migration

Connect Prisma to the Express app

Fetch real data from the database via /tasks

4.1 Installing and Initialising Prisma

Prisma was installed and initialised inside the server directory.

Commands used:

npm install prisma --save-dev
npm install @prisma/client
npx prisma init


This generated:

prisma/schema.prisma

.env

prisma.config.ts

4.2 Defining the Database Schema

The following model was added to schema.prisma:

model Task {
  id          Int     @id @default(autoincrement())
  title       String
  description String?
}


The datasource was configured for PostgreSQL using:

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

4.3 Running the First Migration

Command:

npx prisma migrate dev --name init_task_model

Initial Error Encountered

Error:

The datasource property 'url' is no longer supported in schema files

Why This Happened

Recent Prisma versions moved some connection configuration logic to prisma.config.ts. The schema was still referencing url, which caused a validation error.

Resolution

We updated prisma.config.ts to include:

import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});


After correcting configuration, the migration ran successfully.

Terminal confirmation:

Your database is now in sync with your schema.

4.4 Generating Prisma Client

Command:

npx prisma generate


Prisma Client was generated inside:

node_modules/@prisma/client

4.5 Creating Prisma Client Instance

File created: src/prisma.js

Final working version:

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

Major Errors Encountered During Client Setup
Error 1 — PrismaClientConstructorValidationError

Error:

PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions

Why It Happened

We attempted to pass unsupported options such as:

datasourceUrl

engineType

other outdated configuration examples

These are not valid in Prisma v7 unless using specific adapters.

Resolution

Reverted to:

new PrismaClient();


Prisma automatically reads configuration from the environment and generated client metadata.

Error 2 — Unknown property datasourceUrl

Error:

Unknown property datasourceUrl provided to PrismaClient constructor


Cause: Attempted manual override of datasource in constructor.

Fix: Removed custom options entirely.

Error 3 — TypeScript "process not found"

In prisma.config.ts, VS Code showed:

Cannot find name 'process'


Cause: Node type definitions not installed.

Fix:

npm install -D @types/node


This resolved the editor warning without affecting runtime.

4.6 Connecting Prisma to Express Routes

Updated /tasks route:

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

Question Asked During Development

“I didn’t get GET http://localhost:5000/tasks
 — I got a blank page.”

Explanation

The route was working correctly.

When the database contains no records, Prisma returns:

[]


An empty array appears blank in a browser but confirms:

Server is running

Route exists

Database connection is working

Query executed successfully

This was expected behaviour.

Final Verification

After restarting the server:

npm run dev


Terminal output:

Server is running on port 5000


Browser tests:

http://localhost:5000 → API running message

http://localhost:5000/tasks → []

Database connection confirmed operational.

Lessons Learned in Step 4

Prisma v7 configuration differs from older tutorials

Constructor overrides are rarely needed

Prisma automatically manages connection config when properly generated

Blank JSON responses can still indicate success

TypeScript warnings do not always indicate runtime failures

Step 4 Status

PostgreSQL connected

Prisma schema migrated

Prisma Client generated

Express route querying database successfully

No runtime crashes

Development environment stable

Step 4 complete.
