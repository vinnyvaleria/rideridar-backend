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
    const payload = jwt.verify(
        token,
        process.env.SECRET,
        function (err, decoded) {
            // If valid token, decoded will be the token's entire payload
            // If invalid token, err will be set
            console.log(err, decoded);
            if (err !== null) {
                return null;
            }
            return decoded;
        }
    );
    return payload;
}

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT,
};
