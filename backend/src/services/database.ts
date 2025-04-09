import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { SQLDatabase, UserData } from '../types';

export const createDatabase = async (): Promise<SQLDatabase> => {
  const db = await open({
    filename: './db.sqlite',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);

  return db;
};

export const getData = async (db: SQLDatabase) => {
  return await db.all('SELECT * from tasks');
};

export const insertData = async (db: SQLDatabase, title: string, content: string) => {
  await db.run(`INSERT into tasks (title, content) values (?, ?)`, [title, content]);
};

export const insertNewUser = async (db: SQLDatabase, username: string, email: string, hashedPassword: string) => {
  return await db.run(
    `INSERT INTO users (username, email, password_hash) VALUES ('${username}', '${email}', '${hashedPassword}')`
  );
};

export const getUserByUsername = async (db: SQLDatabase, username: string): Promise<UserData> => {
  return (await db.get(`SELECT * FROM users WHERE username = ?`, [username])) as UserData;
};
