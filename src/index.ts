import express, { Request, Response } from 'express';
const cors = require('cors');
const dotenv = require('dotenv');
import { connection } from './database/index';
import router from './api';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running!');
});

// Use the user routes
app.use('/api', router);

const PORT = process.env.PORT || 3000;
connection();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });