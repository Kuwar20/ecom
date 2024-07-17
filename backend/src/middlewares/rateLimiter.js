import { RateLimiterMemory } from 'rate-limiter-flexible';

// General rate limiter configuration (if needed)
const generalOpts = {
    points: 6, // Number of points
    duration: 15 * 60, // Per 15 minutes
    blockDuration: 15 * 60, // Block for 15 minutes if consumed more than points
};

// Create rate limiter instances
const rateLimiter = new RateLimiterMemory(generalOpts);

// General rate limiting middleware
const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then((rateLimiterRes) => {
            console.log(`Attempt from ip ${req.ip}, remaining points: ${rateLimiterRes.remainingPoints}`);
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': generalOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            next();
        })
        .catch((rateLimiterRes) => {
            console.log(`Too many attempts from ${req.ip}, blocking for ${Math.ceil(rateLimiterRes.msBeforeNext / 1000)} seconds`);
            res.set({
                'Retry-After': Math.ceil(rateLimiterRes.msBeforeNext / 1000),
                'X-RateLimit-Limit': generalOpts.points,
                'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
                'X-RateLimit-Reset': new Date(Date.now() + rateLimiterRes.msBeforeNext).toISOString(),
            });
            // so that frontend gets this as error in json format and can display it
            res.status(429).json({ error: `Too many requests from ${req.ip}, please try after ${Math.ceil(rateLimiterRes.msBeforeNext / 1000)} seconds` });
        });
};

export { rateLimiterMiddleware, rateLimiter };