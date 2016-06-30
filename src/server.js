import './util/env';

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import { start as authStartRoute } from './backend/routes/auth';
import reactRoute from './backend/routes/react';

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.post('/auth/start', authStartRoute);

app.use(reactRoute);

export default app;
