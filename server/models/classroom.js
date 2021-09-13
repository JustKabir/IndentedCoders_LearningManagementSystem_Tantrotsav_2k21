const mongoose = require('mongoose')

const classroomSchema = new mongoose.Schema({
    classroomName:{
        type:String,
        required:true
    },
    subjects:[{
            subjectName:{
                type:String,
                required:true
            },
            teacherName:{
                type:String,
                required:true
            },
            posts:[
                {type:String}
            ]
    }]
})

mongoose.model("Classroom",classroomSchema)