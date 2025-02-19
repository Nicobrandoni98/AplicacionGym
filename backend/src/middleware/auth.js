const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("🛡️ Received Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extrae el token después de "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token con la clave secreta
    req.user = await User.findById(decoded.id).select("-password"); // Adjunta el usuario a `req.user`
    console.log("✅ Token decoded:", decoded); // <-- Verifica que se está decodificando correctamente
    next();
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }

    next(); // Pasa al siguiente middleware/controlador
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
