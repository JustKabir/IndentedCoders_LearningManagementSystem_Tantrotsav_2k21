const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Classroom = mongoose.model("Classroom")
const Student = mongoose.model("Student")
const requireSignin = require('../middleware/requireSignin')
const csv=require('csvtojson')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')


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

router.post('/classSubject',requireSignin,(req,res)=>{
    const {id} = req.body
    console.log(id)
    Classroom.findOne({classroomName:id}).then((result)=>{
        res.json(result.subjects)
    }).catch(err=>{
        console.log(err)
    })
})

router.post('/upload',requireSignin,(req,res)=>{
    if(req.files === null){
        return res.status(400).json({ message: "No file was uploaded"})
    }
    const file = req.files.file;
    const name = file.name
    file.mv(`F:/react projects/tantrotsav/LearnIT/client/public/uploads/${name}`)
    const path = `F:/react projects/tantrotsav/LearnIT/client/public/uploads/${name}`
    console.log("file uploaded")
    console.log(file)
    console.log(name)
    res.json({message:"file uploaded"})
    csv()
    .fromFile(path)
    .then((jsonObj)=>{
        jsonObj.map((item)=>{
            bcrypt.hash(item.id,12)
            .then(hashedpassword=>{
                const student = new Student({
                    studentName:item.studentName,
                    password:hashedpassword,
                    studentClass:item.studentClass
                })
                student.save()
                .then(user=>{
                    res.json({message:"saved successfully"})
                })
                .catch(error=>{
                    console.log(error)
                })
            })
        })
    })
})


module.exports = router