import dotenv from 'dotenv';
import app from './app.js';
import { ensureDatabase } from './services/storageService.js';

// dotenv reads the variables inside the `.env` file and makes them available in our code 
// through `process.env.VARIABLE_NAME`. We run this first so everything else has access to the secrets.
dotenv.config();

// We get the port from the .env file, or default to 5000 if it's not set.
const PORT = process.env.PORT || 5000;

// Before starting the server, we need to make sure our fake database (the JSON files in the /data folder)
// is set up and ready to go. The 'await' keyword means "wait until this is done before moving on".
await ensureDatabase();

// This tells our Express app to start listening for incoming traffic on the specified port.
// Once it starts, it will print the message below in the terminal.
app.listen(PORT, () => {
  console.log(`AI Quiz API running on http://localhost:${PORT}`);
});
