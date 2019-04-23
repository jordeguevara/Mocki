const express =require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));


router.get('/google/success', (req,res)=>{
res.send({yes: 's'})
}
);



module.exports = router;
