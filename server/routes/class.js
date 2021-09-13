const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Classroom = mongoose.model("Classroom")
const requireSignin = require('../middleware/requireSignin')


router.post('/createClass',requireSignin,(req,res)=>{
    const { classroomName } = req.body
    if(! classroomName){
        return res.status(422).json({error:"Please enter the Classroom Name"})
    }
    const classroom = new Classroom({
        classroomName
    })
    classroom.save().then((result)=>{
        res.json({classroom:result})
    }).catch(err=>{
        console.log(err)
    })
})


router.get('/allClass',requireSignin,(req,res)=>{
    Classroom.find().then((result)=>{
        res.json(result)
    }).catch(err=>{
        console.log(err)
    })
})


router.put('/addSubject',requireSignin,(req,res)=>{
    const {id, subjectName, teacherName} = req.body
    if(!id || !subjectName || !teacherName){
        return res.status(422).json({error:"Please enter all fields"})
    }
    Classroom.findOneAndUpdate({classroomName:id},{
        $push:{subjects:{subjectName,teacherName}}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports = router