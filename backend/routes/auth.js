import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ethers } from 'ethers';
import User from '../models/User.js';
import { verifySignature } from '../utils/crypto.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, username, password, walletAddress, signature, nonce } = req.body;

        if (!firstName || !lastName || !username || !password || !walletAddress) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Verify wallet signature if provided
        if (signature && nonce) {
            const isValid = verifySignature(walletAddress, nonce, signature);
            if (!isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid wallet signature'
                });
            }
        }

        // Check existing user
        const existingUser = await User.findOne({
            $or: [{ username }, { walletAddress }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        const emailAddress = `${username}@mailme.web3`;

        const user = new User({
            firstName,
            lastName,
            dateOfBirth,
            username,
            password: hashedPassword,
            walletAddress: walletAddress.toLowerCase(),
            emailAddress,
            isVerified: true
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, walletAddress: user.walletAddress, username: user.username },
            process.env.JWT_SECRET || 'mailme-secret',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    emailAddress: user.emailAddress,
                    walletAddress: user.walletAddress
                }
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password required'
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { userId: user._id, walletAddress: user.walletAddress, username: user.username },
            process.env.JWT_SECRET || 'mailme-secret',
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    emailAddress: user.emailAddress,
                    walletAddress: user.walletAddress
                }
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

export default router;
