import { createClient } from 'redis';

const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
    // Handle the failure after the first attempt
    console.error('Failed to connect to Redis. Exiting...');
    process.exit(1); // Exit the process if unable to connect
});

redisClient.on('connect', () => {
    console.log('Successfully connected to Redis');
});

redisClient.on('ready', () => {
    console.log('Redis client is ready to use');
});

// Function to connect to Redis
async function connectToRedis() {
    try {
        await redisClient.connect();
    } catch (err) {
        console.error('Error connecting to Redis:', err);
        process.exit(1);
    }
}

// Connect to Redis
connectToRedis();

export default redisClient;