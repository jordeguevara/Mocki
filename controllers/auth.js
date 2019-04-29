const express =require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout', (req,res)=>{
    req.logout();
    res.status(301).redirect("http://localhost:3000/login")
})

router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

router.get('/google/success',passport.authenticate('google'),  (req,res)=>{
res.status(301).redirect("http://localhost:3000/dashboard")
}
);

module.exports = router;
