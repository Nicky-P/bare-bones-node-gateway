import express, { Application } from 'express';
import cors from 'cors';
import exmapleRoutes from './routes/example.routes';
import { port } from './config';

const app: Application = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Bare Bones Node Gateway' });
});

exmapleRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
