const express = require('express')

const router = express.Router()
const loginController = require("../controllers/loginController")

router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)
router.get('/register', loginController.getRegister);
router.post('/register', loginController.postRegister);
router.get('/logout', (req, res) => {
  res.clearCookie('account');
  res.redirect('/');
});

module.exports = router