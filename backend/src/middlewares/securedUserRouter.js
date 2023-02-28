const {getAuth} = require('firebase-admin/auth');
const auth = getAuth();


module.exports = async (req, res, next) => {
    try {
        const {uid:reqUid} = req.query;
        if(!reqUid) throw Error()

        const sessionCookie = req.cookies.session || undefined;
        if(!sessionCookie) throw Error()
    
        const {uid} = await auth.verifySessionCookie(sessionCookie, true);
        if(!uid) throw Error()
        
        if(uid !== reqUid) throw Error()

        next();
    } catch (error) {
        res.redirect('/login?continuePath=' + req.path);
    }
}