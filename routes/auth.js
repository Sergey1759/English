const express = require('express');
const router = express.Router();
const User = require('../api/user');
const Token = require('../modules/token');

router.get('/', function(req, res, next) {
    if(req.cookies.token){
        const {user} = Token.verify(req.cookies.token);
        if(user) {return res.redirect('word/all')};
    }

    res.render('auth', { title: 'Express' });
});

router.post('/login', async function(req, res, next) {
    let isUser = await User.CheckPassword(req.body.username,req.body.password);
    if (!isUser) return res.send({err: '403'})
    let token = Token.createJWT(isUser);
    res.send({token});
});

module.exports = router;
