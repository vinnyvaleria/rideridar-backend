const utilSecurity = require("../util/security");

function checkJWT(req, res, next) {
    let token = req.get("Authorization") || req.query.token;
    console.log("=== JWT CHECK DEBUG ===");
    console.log("Raw Authorization header:", req.get("Authorization"));
    console.log("Query token:", req.query.token);
    console.log("Final token to verify:", token);

    if (token) {
        token = token.replace("Bearer ", "");
        console.log("Token after Bearer removal:", token);

        req.user = utilSecurity.verifyJWT(token);
        console.log("User from token:", req.user);
        console.log("=== END DEBUG ===");
    } else {
        console.log("No token found");
        req.user = null;
    }
    return next();
}

// make use of req.user check if they are login
function checkLogin(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized");
    // A okay
    next();
}

// make use of req.user check if they are owner or if they are admin
function checkPermission(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json("Unauthorized");
    // if you are not the owner and you are not admin -> unauthorized
    if (req.body.email != req.user.email && req.user.is_admin == false)
        return res.status(401).json("Unauthorized");
    next();
}

module.exports = {
    checkJWT,
    checkLogin,
    checkPermission,
};
