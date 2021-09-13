const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    teacherName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

mongoose.model("Teacher",teacherSchema)