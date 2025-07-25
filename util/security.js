var jwt = require("jsonwebtoken");

function createJWT(payload) {
    return jwt.sign({ payload }, process.env.SECRET, { expiresIn: "48h" });
}

function getExpiry(token) {
    const payloadBase64 = token.split(".")[1];
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const decoded = JSON.parse(decodedJson);
    const exp = decoded.exp;
    return exp;
}

function verifyJWT(token) {
    try {
        // Use synchronous version for simpler error handling
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("Decoded token:", decoded);

        // Return the actual payload since we wrapped it in { payload } when creating
        return decoded.payload;
    } catch (err) {
        console.log("JWT verification error:", err.message);
        return null;
    }
}

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT,
};
