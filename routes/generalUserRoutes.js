// Import depandencies
const { Router } = require("express")
const router = Router()

// Import local depandencies
const generalUserControllers = require('../controllers/generalUserControllers')

// Signup route
router.post('/signup', generalUserControllers.signup_post)

// Export the module
module.exports = router