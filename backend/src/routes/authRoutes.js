import express from 'express';
const router = express.Router();
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import { rateLimiter } from '../middlewares/rateLimiter.js'

import jwt from 'jsonwebtoken';
import authenticateToken from '../middlewares/auth.js';

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
        const token = jwt.sign({ _id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'User logged in successfully', token });
    } catch (error) {
        console.error(error);
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
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong, please try again" });
    }
});

export default router;