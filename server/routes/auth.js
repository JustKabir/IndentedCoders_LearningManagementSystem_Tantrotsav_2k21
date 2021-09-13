const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Teacher = mongoose.model("Teacher")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../keys')

router.post('/registerTeacher',(req,res)=>{
    const { teacherName, password } = req.body
    if(!teacherName || !password){
        return res.status(422).json({error:"please add all the fields"})
    }
    Teacher.findOne({teacherName:teacherName})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const teacher = new Teacher({
                teacherName,
                password:hashedpassword
            })
            teacher.save()
            .then(user=>{
                res.json({message:"saved successfully"})
            })
            .catch(error=>{
                console.log(error)
            })
        })
    })
    .catch(error=>{
        console.log(error)
    }) 
})

router.post('/signin',(req,res)=>{
    const { name,password } = req.body
    if( !name || !password ){
        return res.status(422).json({error:"Please enter Name and Password"})
    }
    User.findOne({name:name})
    .then(savedUser=>{
        if(!savedUser){
            Teacher.findOne({teacherName:name})
            .then(savedTeacher=>{
                if(!savedTeacher){
                    return res.status(422).json({error:"Invalid Name or Password"})
                }
                bcrypt.compare(password,savedTeacher.password)
                .then(Matched=>{
                    if(Matched){
                        // res.json({message:"successfully signed in"})
                        const token =jwt.sign({_id:savedTeacher._id},JWT_KEY)
                        res.json({token,user:{name:savedTeacher.name},type:"TEACHER"})
                    }
                    else{
                        return res.status(422).json({error:"Invalid Name or Password"})
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            })
            
        }
        bcrypt.compare(password,savedUser.password)
        .then(Matched=>{
            if(Matched){
                // res.json({message:"successfully signed in"})
                const token =jwt.sign({_id:savedUser._id},JWT_KEY)
                res.json({token,user:{name:savedUser.name},type:"ADMIN"})
            }
            else{
                return res.status(422).json({error:"Invalid Name or Password"})
            }
        })
        .catch(error=>{
            console.log(error)
        })
    })
})


module.exports = router