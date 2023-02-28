const Router = require('express');
const router = Router();

const db = require('../../../service/fireStoreService');

router.delete('/deleteFavoritePhoto', async (req, res) => {
    try {
        const {uid, links} = req.body;
        
        await db.deleteUserFavoriteItem({links}, uid);
    
        res.status(200).send(JSON.stringify({message: 'image deleted'}))
    } catch (error) {
        res.status(500).send(JSON.stringify({message: 'server error: image deleted'}))
    }

});


module.exports = router