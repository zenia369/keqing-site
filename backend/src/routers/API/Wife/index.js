const Router = require('express');
const router = Router();

const addFavoritePhoto = require('./addFavoritePhoto');

router.use('/wife', addFavoritePhoto);


module.exports = router