const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function requireAuth(req, res, next){
    try{
        // Read Token off cookies
        const token = req.cookies.Authorization;
        // decode the token
        const decoded = jwt.verify(token, process.env.SECRET);


        //Check Expiration
        if (Date.now() > decoded.app) return res.sendStatus(401)

        // find user using decoded sub
        const user = await User.findById(decoded.sub)
        if (!user) return res.sendStatus(401);

        //attach user to req
        req.user = user;


        //continue on



        // console.log("In Middleware")
        next();
    } catch(err) {
        return res.sendStatus(401)
        
    }


}

module.exports = requireAuth;