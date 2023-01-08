const Router = require('express');
const router = Router();

const db = require('../../../service/fireStoreService');

router.put('/changeAvatar', async (req, res) => {
    try {
        const {uid, avatar, card} = req.body;

        await db.changeUserData({avatar, card}, uid);
    
        res.status(200).send(JSON.stringify({message: 'new avatar saved'}))
    } catch (error) {
        res.status(500).send(JSON.stringify({message: 'server error: save avatar'}))
    }

});


module.exports = router