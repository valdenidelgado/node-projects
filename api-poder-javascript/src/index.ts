import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';

mongoose.set('strictQuery', true);

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app = express();
    const port = 8000;

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
    console.log('Connected to MongoDB...');
  })
  .catch((err) => console.error('Could not connect to MongoDB... ', err));
