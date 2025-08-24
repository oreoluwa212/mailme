import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    from: { type: String, required: true }, // wallet address
    to: { type: String, required: true }, // wallet address
    subject: { type: String, required: true },
    encryptedContent: { type: String, required: true },
    encryptedKey: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false },
    transactionHash: { type: String },
    blockNumber: { type: Number }
});

export default mongoose.model('Message', messageSchema);
