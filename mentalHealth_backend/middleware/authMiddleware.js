// backend/middleware/authMiddleware.js
const admin = require('firebase-admin');

const dotenv=require("dotenv")
dotenv.config()
admin.initializeApp({
  credential: admin.credential.cert(process.env.FIREBASE_CONFIG)
});

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    console.log("token",token)
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };