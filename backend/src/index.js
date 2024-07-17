import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

// Logging
import bodyParser from 'body-parser';
import { logRequestResponse } from '../logger.js';
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(logRequestResponse);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})