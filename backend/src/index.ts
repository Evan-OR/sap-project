import express, { Request, Response } from 'express';
import { createDatabase, getData, insertData } from './services/database';

const startServer = async () => {
  try {
    const app = express();

    const db = await createDatabase();

    app.use(express.json());

    app.get('/api/tasks', async (req: Request, res: Response) => {
      const tasks = await getData(db);

      res.json(tasks);
    });

    app.post('/api/tasks', async (req: Request, res: Response) => {
      const { title, content } = req.body;

      await insertData(db, title, content);

      res.status(201).json({ mes: 'added' });
    });

    app.listen(3000, () => {
      console.log('Running on http://localhost:3000');
    });
  } catch (err) {
    console.error('Server failed to start :(');
    console.error(err);
  }
};

startServer();
