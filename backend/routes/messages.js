
// backend/routes/messages.js
import express from 'express';
import Message from '../models/Message.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { encryptMessage, decryptMessage } from '../utils/crypto.js';

const router = express.Router();

// Send message
router.post('/send', authenticate, async (req, res) => {
    try {
        const { to, subject, content } = req.body;
        const fromWallet = req.user.walletAddress;

        if (!to || !subject || !content) {
            return res.status(400).json({
                success: false,
                message: 'To, subject, and content are required'
            });
        }

        // Find recipient
        const recipient = await User.findOne({
            $or: [{ emailAddress: to }, { walletAddress: to.toLowerCase() }]
        });

        if (!recipient) {
            return res.status(404).json({
                success: false,
                message: 'Recipient not found'
            });
        }

        // Encrypt message
        const { encryptedContent, encryptedKey } = encryptMessage(content);

        const message = new Message({
            from: fromWallet,
            to: recipient.walletAddress,
            subject,
            encryptedContent,
            encryptedKey
        });

        await message.save();

        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: { messageId: message._id }
        });

    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message',
            error: error.message
        });
    }
});

// Get inbox messages
router.get('/inbox', authenticate, async (req, res) => {
    try {
        const userWallet = req.user.walletAddress;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const messages = await Message.find({ to: userWallet })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit);

        // Decrypt messages
        const decryptedMessages = messages.map(msg => ({
            id: msg._id,
            from: msg.from,
            subject: msg.subject,
            content: decryptMessage(msg.encryptedContent, msg.encryptedKey),
            timestamp: msg.timestamp,
            isRead: msg.isRead
        }));

        res.json({
            success: true,
            data: {
                messages: decryptedMessages,
                pagination: { page, limit, total: messages.length }
            }
        });

    } catch (error) {
        console.error('Get inbox error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get messages',
            error: error.message
        });
    }
});

export default router;