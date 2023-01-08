const Router = require('express');
const router = Router();

const login = require('./login');
const registration = require('./registration');

router.use('/auth', login);
router.use('/auth', registration);


module.exports = router