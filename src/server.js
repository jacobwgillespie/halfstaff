import './util/env';

import express from 'express';
import path from 'path';

import reactRoute from './backend/routes/react';

export const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.use(reactRoute);

export default app;
