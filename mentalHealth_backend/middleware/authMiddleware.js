// backend/middleware/authMiddleware.js
const admin = require('firebase-admin');
const serviceAccount = require('../mental-health-9fcd8-firebase-adminsdk-l8vcs-95e7185cee.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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