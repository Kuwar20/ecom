import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, json } = format;

// Custom format for console logging
const consoleLogFormat = printf(({ level, message, timestamp }) => {
    if (typeof message === 'object') {
        return `${level}: ${JSON.stringify(message, null, 2)}`;
    }
    return `${level}: ${message}`;
});

// Create a Winston logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize timestamp format here
        json() // Output logs in JSON format
    ),
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                consoleLogFormat
            )
        }),
        new transports.File({ filename: 'app.log', format: combine(timestamp(), json()) })
    ],
});

// Middleware function to log request and response details
const logRequestResponse = (req, res, next) => {
    const start = process.hrtime();

    const originalSend = res.send;
    res.send = function (body) {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTime = ((seconds * 1e9 + nanoseconds) / 1e6).toFixed(3);

        const logObject = {
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            responseTime: `${responseTime} ms`,
            responseSize: res.get('Content-Length') || 0,
            remoteAddr: req.ip,
            requestBody: req.body,
            responseBody: body,
            requestHeaders: req.headers,
            responseHeaders: res.getHeaders(),
            queryParameters: req.query,
            userAgent: req.get('User-Agent'),
            referer: req.get('Referer'),
            sessionId: req.sessionID,
            userId: req.user ? req.user.id : null
        };

        logger.info(logObject);

        originalSend.apply(res, arguments);
    };

    next();
};

export { logger, logRequestResponse };
