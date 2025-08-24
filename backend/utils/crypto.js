import crypto from 'crypto';
import { ethers } from 'ethers';

const ALGORITHM = 'aes-256-gcm';
const KEY = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'default-key', 'salt', 32);

export function encryptMessage(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(ALGORITHM, KEY);
    cipher.setAAD(Buffer.from('mailme'));

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return {
        encryptedContent: encrypted,
        encryptedKey: iv.toString('hex') + authTag.toString('hex')
    };
}

export function decryptMessage(encryptedContent, encryptedKey) {
    try {
        const iv = Buffer.from(encryptedKey.slice(0, 32), 'hex');
        const authTag = Buffer.from(encryptedKey.slice(32), 'hex');

        const decipher = crypto.createDecipher(ALGORITHM, KEY);
        decipher.setAAD(Buffer.from('mailme'));
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedContent, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return '[Encrypted Message - Unable to Decrypt]';
    }
}

export function verifySignature(walletAddress, message, signature) {
    try {
        const recoveredAddress = ethers.verifyMessage(message, signature);
        return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
}