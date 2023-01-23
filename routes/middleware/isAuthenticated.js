let jwt = require('../../modules/token')
module.exports = (req,res,next) =>{
    try {
        let {user} = jwt.verify(req.cookies.token);
        if(user) {
            req.user = user
            return next()
        }
    } catch (e) {
        return res.redirect('http://localhost:3000/auth');
    }
    console.log('user');
}