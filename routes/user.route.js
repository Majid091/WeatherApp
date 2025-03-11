const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');



router.post('/register-user', user.createUser);
router.post('/login-user', user.loginUser);
router.delete('/delete-user/:id', user.deleteUser);



module.exports = router