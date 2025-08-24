import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    publicKey: { type: String },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
});

export default mongoose.model('User', userSchema);