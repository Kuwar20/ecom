import express from 'express';
const router = express.Router();
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import { rateLimiter } from '../middlewares/rateLimiter.js'


router.post('/register', async (req, res) => {
    const { name, email, password, role, ...additionalItems } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please fill only the required fields" });
    }
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password, ...additionalItems } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (Object.keys(additionalItems).length > 0) {
        return res.status(422).json({ error: "Please fill only the required fields" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            // User not found, consume an additional point
            await rateLimiter.consume(req.ip);
            return res.status(400).json({ error: "User not found, please signup" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            // Wrong password, consume an additional point
            await rateLimiter.consume(req.ip);
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;