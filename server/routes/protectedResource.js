const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireSignin = require('../middleware/requireSignin')


router.get('./protectedResource',requireSignin,(req,res)=>{

})

module.exports = router