import express from 'express';
import dotenv from 'dotenv';
import trim from './middleware/trim';

import message from './routes/message';

dotenv.config();
const app = express();
app.use(express.json());
app.use(trim);
const port = 8001;
app.use('/message', message);
app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);
  try {
    //code to connect DB if exist
  } catch (error) {}
});
