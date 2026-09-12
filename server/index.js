// Explicit Vercel entry point; src/app.js is a factory used by isolated tests.
import express from 'express';
import backend from './src/index.js';

const app = express();
app.use(backend);
export default app;
