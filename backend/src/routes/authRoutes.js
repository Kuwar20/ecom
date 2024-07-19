import express from 'express';
const router = express.Router();
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import { rateLimiter } from '../middlewares/rateLimiter.js'

import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/auth.js';

import redisClient from '../utils/redis.js';

import dotenv from 'dotenv';
dotenv.config();

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/register', async (req, res) => {
    const { name, email, password, googleToken } = req.body;

    try {
        let user;

        if (googleToken) {
            console.log('Google token:', googleToken);
            // Google Sign-In
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const googleEmail = payload['email'];
            const googleName = payload['name'];

            user = await User.findOne({ email: googleEmail });
            if (user) {
                // User already exists, you might want to update some information here
                // or just return the existing user
            } else {
                let role = 'user';
                if (googleEmail.endsWith('@dealer.com')) {
                    role = 'dealer';
                } else if (googleEmail.endsWith('@admin.com')) {
                    role = 'admin';
                }

                user = new User({
                    name: googleName,
                    email: googleEmail,
                    isGoogleAccount: true,
                    role,
                    password:'defaultGooglePassword'  // Set a default password or handle it differently in your schema
                });
                await user.save();
            }
        } else {
            // Traditional registration
            if (!name || !email || !password) {
                return res.status(400).json({ error: 'Please fill all fields' });
            }

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ error: 'User already exists' });
            }

            let role = 'user';
            if (email.endsWith('@dealer.com')) {
                role = 'dealer';
            } else if (email.endsWith('@admin.com')) {
                role = 'admin';
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            user = new User({ name, email, password: hashedPassword, role });
            await user.save();
        }
        
        res.status(201).json({ 
            message: 'User created successfully', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// how to get google token

// router.post('/login', async (req, res) => {
//     const { email, password, googleToken } = req.body;
//     console.log(email, password, googleToken);
//     if ((!email || !password) && !googleToken) {
//         return res.status(400).json({ message: 'Please provide email and password or Google token' });
//     }

//     try {
//         // Check Redis cache first
//         let user = null;
//         const cachedUser = await redisClient.get(`user:${email}`);

//         if (cachedUser) {
//             user = JSON.parse(cachedUser);
//             console.log('User found in Redis cache');
//         } else {
//             user = await User.findOne({ email });
//             if (user) {
//                 await redisClient.set(`user:${email}`, JSON.stringify(user), {
//                     EX: 3600 // Expire after 1 hour
//                 });
//                 console.log('User stored in Redis cache');
//             }
//         }

//         if (!user) {
//             await rateLimiter.consume(req.ip);
//             return res.status(400).json({ error: "User not found, please signup" });
//         }

//         let isAuthenticated = false;

//         if (googleToken) {
//             // Google Sign-In
//             console.log('Google token:', googleToken);
//             try {
//                 const ticket = await client.verifyIdToken({
//                     idToken: googleToken,
//                     audience: process.env.GOOGLE_CLIENT_ID,
//                 });
//                 const payload = ticket.getPayload();
//                 if (payload['email'] === user.email) {
//                     isAuthenticated = true;
//                 }
//             } catch (error) {
//                 console.error('Error verifying Google token:', error);
//                 return res.status(400).json({ error: "Invalid Google token" });
//             }
//         } else {
//             // Traditional login
//             isAuthenticated = await bcrypt.compare(password, user.password);
//         }

//         if (!isAuthenticated) {
//             await rateLimiter.consume(req.ip);
//             console.log(password, user.password);
//             return res.status(400).json({ error: "Invalid credentials" });
//         }

//         const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ message: 'User logged in successfully', token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

router.post('/login', async (req, res) => {
    const { email, password, googleToken } = req.body;
    console.log(email, password, googleToken);

    if (!googleToken && (!email || !password)) {
        return res.status(400).json({ message: 'Please provide email and password or Google token' });
    }

    try {
        let user = null;

        if (googleToken) {
            // Google Sign-In
            console.log('Google token:', googleToken);
            try {
                const ticket = await client.verifyIdToken({
                    idToken: googleToken,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                user = await User.findOne({ email: payload['email'] });

                if (user) {
                    await redisClient.set(`user:${user.email}`, JSON.stringify(user), {
                        EX: 3600 // Expire after 1 hour
                    });
                    console.log('User stored in Redis cache');
                }
            } catch (error) {
                console.error('Error verifying Google token:', error);
                return res.status(400).json({ error: "Invalid Google token" });
            }
        } else {
            // Check Redis cache first
            const cachedUser = await redisClient.get(`user:${email}`);

            if (cachedUser) {
                user = JSON.parse(cachedUser);
                console.log('User found in Redis cache');
            } else {
                user = await User.findOne({ email });
                if (user) {
                    await redisClient.set(`user:${email}`, JSON.stringify(user), {
                        EX: 3600 // Expire after 1 hour
                    });
                    console.log('User stored in Redis cache');
                }
            }
        }

        if (!user) {
            await rateLimiter.consume(req.ip);
            return res.status(400).json({ error: "User not found, please signup" });
        }

        let isAuthenticated = false;

        if (googleToken) {
            // If Google token is used, assume authentication is successful if user is found
            isAuthenticated = true;
        } else {
            // Traditional login
            isAuthenticated = await bcrypt.compare(password, user.password);
        }

        if (!isAuthenticated) {
            await rateLimiter.consume(req.ip);
            console.log(password, user.password);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.put('/update', authenticateToken, async (req, res) => {
    const { name, oldPassword, newPassword, ...additionalItems } = req.body;
    const authenticatedUserId = req.user._id;

    console.log(req.user);

    if (!name && !oldPassword && !newPassword && Object.keys(additionalItems).length === 0) {
        return res.status(400).json({ error: "Please provide something to update" });
    }

    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please provide only the required fields" });
    }

    try {
        const user = await User.findById(authenticatedUserId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (name) {
            user.name = name;
        }

        if (oldPassword || newPassword) {
            if (!oldPassword || !newPassword) {
                return res.status(400).json({ error: "Both old password and new password are required for password update" });
            }

            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({ error: "Old password cannot be same" });
            }

            if (oldPassword === newPassword) {
                return res.status(400).json({ error: "New password must be different from the old password" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 12);
            user.password = hashedPassword;
        }

        await user.save();

        // Update Redis cache
        await redisClient.set(`user:${user.email}`, JSON.stringify(user), {
            EX: 3600 // Expire after 1 hour
        });

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete('/delete', authenticateToken, async (req, res) => {
    const authenticatedUserId = req.user._id;

    if (!authenticatedUserId) {
        return res.status(400).json({ error: "You are not allowed to delete" });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(authenticatedUserId);
        if (!deletedUser) {
            return res.status(400).json({ error: "User not found" });
        }

        await redisClient.del(`user:${deletedUser.email}`);

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

export default router;