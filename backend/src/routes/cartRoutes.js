import express from 'express';
const router = express.Router();
import authenticateToken from '../middlewares/auth.js';
import User from '../models/userSchema.js';

router.post('/add', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        const existingItem = user.cart.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }

        await user.save();
        res.status(200).json({ message: 'Product added to cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

router.post('/remove', authenticateToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        user.cart = user.cart.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('cart.productId');
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get cart' });
    }
});

export default router;
