const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuthController = async (req, res) => {
  console.log("req rec")
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Google sign-in failed. Please try again.",
      });
    }

    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user exists in MongoDB
    let user = await User.findOne({ email : payload.email });

    if (!user) {
      // Create new user if not found
      user = new User({
        email: payload.email,
        username: payload.name,
      });
      await user.save();
    }

    // Create your own JWT for this user
    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.SECRET_STRING,  
    );

    res.json({
        token: jwtToken,
        email: user.email,
        username: user.name,
      });
  } catch (err) {
    // Log error for developers
    console.error("❌ Google login error:", err);

    res.status(401).json({
      success: false,
      message: "We couldn't sign you in with Google. Please try again later.",
    });
  }
}

module.exports = googleAuthController;