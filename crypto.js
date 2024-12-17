const crypto = require('crypto');

// Générer une clé AES-256 hexadécimale
const aesSecretKey = crypto.randomBytes(32).toString('hex');

console.log(aesSecretKey);
