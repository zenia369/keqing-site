const Router = require('express');
const router = Router();

const db = require('../../../service/fireStoreService');

router.put('/updateStand', async (req, res) => {
    try {
        const {uid, newCard, id} = req.body;
        
        await db.changeUserDataStand({newCard, id}, uid);
    
        res.status(200).send(JSON.stringify({message: 'stand update'}))
    } catch (error) {
        res.status(500).send(JSON.stringify({message: 'server error: update stand'}))
    }

});


module.exports = router