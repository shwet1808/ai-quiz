import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, '../../data');
const dbPath = path.join(dataDir, 'db.json');

const initialData = {
  users: [],
  quizzes: [],
  attempts: []
};

export const ensureDatabase = async () => {
  await mkdir(dataDir, { recursive: true });
  try {
    await readFile(dbPath, 'utf8');
  } catch {
    await writeFile(dbPath, JSON.stringify(initialData, null, 2));
  }
};

export const readDatabase = async () => {
  await ensureDatabase();
  const raw = await readFile(dbPath, 'utf8');
  return JSON.parse(raw);
};

export const writeDatabase = async (data) => {
  await ensureDatabase();
  await writeFile(dbPath, JSON.stringify(data, null, 2));
};

export const updateDatabase = async (updater) => {
  // Central read-modify-write helper keeps JSON persistence logic out of controllers.
  const data = await readDatabase();
  const nextData = await updater(data);
  await writeDatabase(nextData || data);
  return nextData || data;
};
