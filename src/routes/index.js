const express = require('express');
const router = express.Router();

//router.get('',(req,res)=>{});

router.get('/', (req,res) => {

    res.render('public/main');    
});


module.exports = router;