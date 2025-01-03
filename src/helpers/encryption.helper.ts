import * as crypto from 'crypto';

const algorithm = 'aes256';

// Generate a random 32-byte encryption key
export function generateEncryptionKey() {
    return crypto.randomBytes(32);
}

// Function to encrypt data
export function encryptData(plaintext, key) {
    const cipher = crypto.createCipher(algorithm, key);
    return cipher.update(plaintext, 'utf8', 'hex') + cipher.final('hex');
}

// Function to decrypt data
export function decryptData(encrypted, key) {
    const decipher = crypto.createDecipher(algorithm, key);
    return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}
