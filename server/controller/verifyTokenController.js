import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log("token not get");
      return res.status(401).json({
        success: false,
        message: "Token not found. Please login again.",
        
        
      });
      
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Success
    res.status(200).json({
      success: true,
      message: "Token verified",
      userID: decoded.userID,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
