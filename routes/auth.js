const express = require('express');
const router = express.Router();

const { signup, signin, getUserFromToken } = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/getUser', getUserFromToken);

module.exports = router;
