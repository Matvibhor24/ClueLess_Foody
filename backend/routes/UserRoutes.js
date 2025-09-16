const express = require("express")
const {loginController , signupController } = require("../controllers/UserController")
const googleAuthController = require("../controllers/GoogleAuthController")
const router = express.Router();



router.post("/login",loginController)
router.post("/signup",signupController);
router.post('/googleauth',googleAuthController)

module.exports = router;