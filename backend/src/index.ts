import 'dotenv/config';
import express, { Request, Response } from 'express';
import { createDatabase, getData, insertData } from './services/database';
import { generateAuthToken, getUserAuthTokenAndData, registerUser } from './services/loginRegistration';

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

    app.post('/api/register', async (req: Request, res: Response) => {
      try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        if (!username || !email || !password) {
          res.status(400).json({ message: 'Missing value', username, email, password });
          return;
        }

        const id = (await registerUser(db, username, email, password)) as number;

        const authToken = generateAuthToken(id, username, email, password);

        res.cookie('auth_token', authToken);
        res.cookie('user_data', { id, username, email, password });

        res.status(201).json({ message: 'Registration successful' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
      }
    });

    app.post('/api/login', async (req: Request, res: Response) => {
      try {
        const usernameParam = req.body.username;
        const passwordParam = req.body.password;

        if (!usernameParam || !passwordParam) {
          res.status(400).send({ message: 'Missing value', usernameParam, passwordParam });
          return;
        }

        const { id, username, email, password_hash } = await getUserAuthTokenAndData(db, usernameParam, passwordParam);
        const authToken = generateAuthToken(id, username, email, password_hash);

        res.cookie('auth_token', authToken);
        res.cookie('user_data', { id, username, email });

        res.status(200).json({ message: 'Login successful' });
      } catch (err) {
        if (err instanceof Error && err.message === 'Invalid login creds') {
          res.status(400).json({ error: err.message });
        } else {
          console.log(err);
          res.status(500).json({ error: 'Failed to Login' });
        }
      }
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
