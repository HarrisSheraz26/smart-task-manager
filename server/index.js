import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './src/prisma.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ health check
app.get('/', (req, res) => {
  res.send('Smart Task Manager API is running');
});

// ✅ GET tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ✅ KEEP SERVER ALIVE
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
