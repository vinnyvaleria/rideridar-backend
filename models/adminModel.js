const crypto = require("crypto-js");
const Admin = require("../daos/adminDao");
const utilSecurity = require("../util/security");

async function addAdmin(data) {
    try {
        // check for existing user through email
        const userFound = await Admin.findOne({ email: data.email });

        if (userFound) {
            return {
                status: 1,
                message: "Registration failed.",
            };
        }

        // check if the password meets minimum length of 8
        if (data.password.length < 8) {
            return {
                status: 2,
                message: "Password must be at least 8 characters long.",
            };
        }

        // auto-generate salt of 16 bytes
        const salt = crypto.lib.WordArray.random(16).toString(crypto.enc.Hex);
        const iterations = 100;

        // make sure to store only hashed password
        // https://cryptojs.gitbook.io/docs/
        const hashedPassword = crypto
            .PBKDF2(data.password, crypto.enc.Hex.parse(salt), {
                keySize: 256 / 32,
                iterations: iterations,
                hasher: crypto.algo.SHA256,
            })
            .toString(crypto.enc.Hex);

        // remove plain password from data
        delete data.password;

        // new admin data
        const adminData = {
            ...data,
            hashedPassword,
            hash: {
                salt,
                iterations,
            },
        };

        const newAdmin = await Admin.create(adminData);

        return {
            status: 0,
            message: "Admin account created successfully",
            admin: newAdmin,
        };
    } catch (error) {
        console.error("Error in addAdmin:", error); // Add this line
        return {
            status: 500,
            message: "Server error occurred",
        };
    }
}

async function loginUser(data) {
    try {
        // check if user email address exists
        const userFound = await Admin.findOne({ email: data.email });

        if (!userFound) {
            return {
                status: 1,
                message: "Invalid credentials.",
            };
        }

        // retrieve salt and iterations stored during registration
        const { salt, iterations = 100 } = userFound.hash;

        const hashedInputPassword = crypto
            .PBKDF2(data.password, crypto.enc.Hex.parse(salt), {
                keySize: 256 / 32,
                iterations: iterations,
                hasher: crypto.algo.SHA256,
            })
            .toString(crypto.enc.Hex);

        // compare the 2 hashed data
        if (hashedInputPassword === userFound.hashedPassword) {
            // create a jwt token
            const payload = { email: data.email, name: userFound.name };
            const token = utilSecurity.createJWT(payload);
            await Admin.updateOne({ email: data.email }, { jwt: token });

            // succesful authentication
            return {
                status: 0,
                message: "Login successful",
                admin: userFound,
                token: token,
            };
        } else {
            // Password mismatch
            return {
                status: 1,
                message: "Invalid credentials.",
            };
        }
    } catch (error) {
        return {
            status: 500,
            message: "Server error occurred",
        };
    }
}

async function logoutUser(data) {
    // retrieve userData based on email
    const userData = await Admin.findOne({ email: data.email });

    if (!userData) {
        return {
            status: 1,
            message: "No account found with this email.",
        };
    }

    // clear the stored JWT
    userData.jwt = "";
    await userData.save();

    return {
        status: 0,
        message: "Logout successful.",
    };
}

module.exports = {
    addAdmin,
    loginUser,
    logoutUser,
};
