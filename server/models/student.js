const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    studentClass:{
        type:String,
        required:true
    }
})

mongoose.model("Student",studentSchema)