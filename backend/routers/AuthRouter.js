// backend/routers/AuthRouter.js
import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const saltRounds = 10;
const router = express.Router();

router.get('/AuthSignUp', (req, res) => {
    res.send("hello")
});

router.post('/AuthSignUp', async (req, res) => {
    const { email, password, name, phone } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            email,
            password: hashedPassword, 
            name,
            phone
        });

        await user.save();

        res.status(201).json({
            success: true,
            user: { email: user.email, name: user.name, phone: user.phone }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/AuthLogin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email: email });
        console.log(userData);
        if (!userData) {
            return res.status(401).send('Invalid Credentials');
        }

        const isMatch = bcrypt.compare(password, userData.password);

        if (isMatch) {
            const token = jwt.sign({email: email}, process.env.JWT_SECRET)
            console.log(token)
            res.status(200).send({success:true, token:token});
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});

export default router;
