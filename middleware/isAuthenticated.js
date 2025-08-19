import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login or token not found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.id = decoded.userID;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
