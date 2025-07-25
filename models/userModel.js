const authUtil = require("../util/authentication");

async function addUser(data, Model, userType = "user") {
    try {
        // check for existing user through email
        const userFound = await Model.findOne({
            email: data.email,
            phone: data.phone,
        });

        if (userFound) {
            return {
                status: 1,
                message: "Registration failed. User already exists.",
            };
        }

        // check if the password meets minimum length of 8
        if (data.password.length < 8) {
            return {
                status: 2,
                message: "Password must be at least 8 characters long.",
            };
        }

        // hash the password
        const { hashedPassword, salt, iterations } = authUtil.hashPassword(
            data.password
        );

        // create id for user
        const id = generateUserId(data, userType);

        // remove plain password from data
        delete data.password;

        // prepare user data
        const userData = {
            ...data,
            id,
            hashedPassword,
            hash: {
                salt,
                iterations,
            },
        };

        const newUser = await Model.create(userData);

        return {
            status: 0,
            message: `${
                userType.charAt(0).toUpperCase() + userType.slice(1)
            } account created successfully`,
            user: newUser,
        };
    } catch (error) {
        console.error(`Error in register${userType}:`, error);
        return {
            status: 500,
            message: "Server error occurred",
        };
    }
}

async function loginUser(data, Model, userType = "user") {
    try {
        // check if user email address exists
        const userFound = await Model.findOne({ email: data.email });

        if (!userFound) {
            return {
                status: 1,
                message: "Invalid credentials.",
            };
        }

        // retrieve salt and iterations stored during registration
        const { salt, iterations = 100 } = userFound.hash;

        // get the stored password hash based on user type
        const storedHash = userFound.hashedPassword;

        // verify password
        const isPasswordValid = authUtil.verifyPassword(
            data.password,
            storedHash,
            salt,
            iterations
        );

        if (isPasswordValid) {
            // create a jwt token
            const token = authUtil.createToken({
                email: data.email,
                name: userFound.name,
                userType: userType,
            });

            await Model.updateOne({ email: data.email }, { jwt: token });

            // successful authentication
            return {
                status: 0,
                message: "Login successful",
                user: userFound,
                token: token,
            };
        } else {
            // password mismatch
            return {
                status: 1,
                message: "Invalid credentials.",
            };
        }
    } catch (error) {
        console.error(`Error in login${userType}:`, error);
        return {
            status: 500,
            message: "Server error occurred",
        };
    }
}

async function logoutUser(data, Model, userType = "user") {
    try {
        // retrieve userData based on email
        const userData = await Model.findOne({ email: data.email });

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
            user: userData,
        };
    } catch (error) {
        console.error(`Error in logout${userType}:`, error);
        return {
            status: 500,
            message: "Server error occurred",
        };
    }
}

function generateUserId(data, userType) {
    const namePart = data.name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");

    // last 3 digits of phone
    const phonePart = data.phone.toString().slice(-3);

    if (userType === "driver") {
        // first letter of vehicleType
        const vehicleTypePart = data.vehicle.vehicleType[0].toUpperCase();
        // last 3 alphanumerics of plateNumber
        const platePart = data.vehicle.plateNumber
            .replace(/\s+/g, "")
            .slice(-3)
            .toUpperCase();
        // combined vehicle parts
        const vehiclePart = `${vehicleTypePart}${platePart}`;

        return `D-${namePart}${phonePart}-${vehiclePart}`;
    } else if (userType === "admin") {
        // super admin part
        const superAdminPart = data.isSuperAdmin ? "S" : "R";

        return `A-${namePart}${phonePart}${superAdminPart}`;
    }
}

module.exports = {
    addUser,
    loginUser,
    logoutUser,
};
