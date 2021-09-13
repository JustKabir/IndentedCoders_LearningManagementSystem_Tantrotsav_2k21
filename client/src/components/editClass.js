import React,{useEffect, useState} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import M from 'materialize-css'

function EditClass() {
    const history = useHistory()
    const {id} = useParams()
    const [subjectName,setSubjectName] = useState("")
    const [teacherName,setTeacherName] = useState("")
    const addSubject = ()=>{
        fetch("/addSubject",{
            method:"put",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id,
                subjectName,
                teacherName
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Subject Added Successully", classes:"#43a047 green darken-1"})
                history.push(`/class/${id}`)
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    useEffect(()=>{
        M.AutoInit()
    },[])
    return (
        <div className="container">
            Edit {id}
            <br/>
            <button data-target="modal1" className="btn modal-trigger">Add Subject</button>

            <div id="modal1" className="modal">
                <div class="modal-content">
                <input 
              placeholder="subjectName" 
              type="text" 
              value={subjectName} 
              onChange={(e)=>{
                  setSubjectName(e.target.value)
                }}
              />
              <input 
              placeholder="Teacher Name" 
              type="text"
              value={teacherName} 
              onChange={(e)=>{
                  setTeacherName(e.target.value)
                }}
              />
                </div>
                <div class="modal-footer">
                <button className="waves-effect waves-light btn large-btn"
                onClick={()=>addSubject()}>
                    Add Subject
                </button>
                </div>
            </div>
        </div>
    )
}

export default EditClass
