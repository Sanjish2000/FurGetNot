import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Token verified",
      userID: decoded.userID || decoded.adminId,
      role: decoded.userID ? "user" : "admin",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
