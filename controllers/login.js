const express =require('express');
const router = express.Router();
// var cors = require('cors')
// router.use(cors())

// router.use( (req,res,next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Contorl-Allow-Header', 
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
//     if(req.method === 'OPTIONS'){
//       res.header('Access-Contorl-Allow-Header', 'GET');
//      return res.status(200).json({});
//     }
//     next();
//   })

router.get('/', (req,res)=>{
    // console.log(req);
    // if(!req.body) {
    //     return res.status(404).send({
    //       success: 'false',
    //       message: 'title is required'
    //     });
    // }

    res.send({data: 'success'
    })
});


router.post('/manual', (req,res)=>{
    res.send({account:'sucesss'});
})

router.post('/', (req,res)=>{
    // console.log(req);
    // if(!req.body) {
    //     return res.status(404).send({
    //       success: 'false',
    //       message: 'title is required'
    //     });
    // }
    

    // const data = req.body.data;
    const body = req.body;
  res.set('Content-Type', 'application/json')
  res.send(JSON.stringify(body))
    // res.send({data: data
    // })
});


module.exports = router;
