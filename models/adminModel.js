const crypto = require("crypto-js");
const Admin = require("../daos/adminDao");

async function addAdmin(data) {
    // check for existing user through email
    const userFound = await Admin.findOne({ email: data.email });

    if (userFound) {
        return {
            status: 1,
            message: "There is an existing account with the same email.",
        };
    }

    // check if the password meets minimum length of 8
    if (data.password.length < 8) {
        return {
            status: 2,
            message: "Password not strong enough!",
        };
    }

    // auto-generate salt of 16 bytes
    const salt = crypto.lib.WordArray.random(16).toString(crypto.enc.Hex);

    // make sure to store only hashed password
    // https://cryptojs.gitbook.io/docs/
    data.hashedPassword = crypto
        .PBKDF2(data.password, crypto.enc.Hex.parse(salt), {
            keySize: 256 / 32,
            iterations: 5,
            hasher: crypto.algo.SHA256,
        })
        .toString(crypto.enc.Hex);

    // store salt and iterations
    data.hash = data.hash || {};
    data.hash.salt = salt;
    data.hash.iterations = 5;

    const newAdmin = await Admin.create(data);

    return {
        status: 0,
        message: "Admin account created successfully",
        admin: newAdmin,
    };
}

module.exports = {
    addAdmin,
};
