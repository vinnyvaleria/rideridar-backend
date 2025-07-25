async function addUser(data, Model, userType = "user") {
    try {
        // check for existing user through email
        const userFound = await Model.findOne({ email: data.email });

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
        const { hashedPassword, salt, iterations } = this.hashPassword(
            data.password
        );

        // remove plain password from data
        delete data.password;

        // prepare user data
        const userData = {
            ...data,
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
        const storedHash =
            userType === "admin"
                ? userFound.hashedPassword
                : userFound.password;

        // verify password
        const isPasswordValid = this.verifyPassword(
            data.password,
            storedHash,
            salt,
            iterations
        );

        if (isPasswordValid) {
            // create a jwt token
            const token = this.createToken({
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

module.exports = {
    addUser,
    loginUser,
};
