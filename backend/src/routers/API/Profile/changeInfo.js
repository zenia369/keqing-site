const Router = require('express');
const router = Router();

const db = require('../../../service/fireStoreService');

router.put('/changeInfo', async (req, res) => {
    try {
        const {name, city, element, uid} = req.body;

        await db.changeUserData({name, city, element}, uid);
    
        res.status(200).send(JSON.stringify({message: 'updated info'}))
    } catch (error) {
        res.status(500).send(JSON.stringify({message: 'server error: save info'}))
    }

});


module.exports = router