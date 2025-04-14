const jwt = require("jsonwebtoken");


const isAuthenticated = async (req, res, next) => {
  try {
    console.log('reach')
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }


    
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode)
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.user = decode.userId
    console.log(req.user)
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

module.exports = { isAuthenticated };