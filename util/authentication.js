const crypto = require("crypto-js");
const utilSecurity = require("./security");

function hashPassword(password) {
    // auto-generate salt of 16 bytes
    const salt = crypto.lib.WordArray.random(16).toString(crypto.enc.Hex);
    const iterations = 100;

    // make sure to store only hashed password
    // https://cryptojs.gitbook.io/docs/
    const hashedPassword = crypto
        .PBKDF2(password, crypto.enc.Hex.parse(salt), {
            keySize: 256 / 32,
            iterations: iterations,
            hasher: crypto.algo.SHA256,
        })
        .toString(crypto.enc.Hex);

    return {
        hashedPassword,
        salt,
        iterations,
    };
}

// verify password by hashing and compare with stored hashedPassword
function verifyPassword(inputPassword, storedHash, salt, iterations) {
    const hashedInputPassword = crypto
        .PBKDF2(inputPassword, crypto.enc.Hex.parse(salt), {
            keySize: 256 / 32,
            iterations: iterations,
            hasher: crypto.algo.SHA256,
        })
        .toString(crypto.enc.Hex);

    return hashedInputPassword === storedHash;
}

// create token with payload
function createToken(userData) {
    const payload = {
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
    };
    return utilSecurity.createJWT(payload);
}

module.exports = {
    hashPassword,
    verifyPassword,
    createToken,
};
