const Router = require('express');
const router = Router();

const changeAvatar = require('./changeAvatar');
const changeInfo = require('./changeInfo');
const updateStand = require('./updateStand');
const deleteFavorite = require('./deleteFavoritePhoto');


router.use('/profile', changeAvatar);
router.use('/profile', changeInfo);
router.use('/profile', updateStand);
router.use('/profile', deleteFavorite);


module.exports = router