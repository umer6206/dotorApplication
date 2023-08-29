const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]; // Use optional chaining to handle missing header
        if (!token) {
            return res.status(401).send({
                message: "Missing authorization token",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.userId = decode.id;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).send({
            message: "Authentication failed",
            success: false,
        });
    }
};
