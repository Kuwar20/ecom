import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 3001;

// Connect to the database
import { connectDB } from './utils/connDB.js';
connectDB();

import redisClient from './utils/redis.js';

import { rateLimiterMiddleware } from './middlewares/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';

// Logging
import bodyParser from 'body-parser';
import { logRequestResponse } from '../logger.js';
app.use(bodyParser.json()); // To parse JSON request bodies
// app.use(logRequestResponse);

app.use('/api/auth', rateLimiterMiddleware, authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})