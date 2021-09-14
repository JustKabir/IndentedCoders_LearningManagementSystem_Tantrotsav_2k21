import React,{useEffect, useState} from 'react'
import {useParams,useHistory, Link} from 'react-router-dom'
import M from 'materialize-css'

function EditClass() {
    const history = useHistory()
    const {id} = useParams()
    const [subjectName,setSubjectName] = useState("")
    const [teacherName,setTeacherName] = useState("")
    const [activeSub,setActiveSub] = useState("")
    const [userType,setUserType] = useState(false)
    const [subjects,setSubjects] = useState([])
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
        if(localStorage.getItem("type")=="ADMIN"){
            setUserType(true)
            console.log(userType)
        }
        fetch('/classSubject',{
            method:"post",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id
            })
        }).then(res=>res.json())
        .then(result=>{
            setSubjects(result)
            console.log(subjects)
        })
        M.AutoInit()
    },[])
    return (
        <div>
        <ul id="slide-out" class="sidenav">
            <li><Link to="/allClass">All Class</Link></li>
            <li><Link to="/createClass">Create Class</Link></li>
            <li><Link to="/registerTeacher">Register Teacher</Link></li>
            <li><Link to="/addStudents">Add Students</Link></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        
        <div className="container">
            <h5>{id}</h5>
            <br/>
            <div className="row">
                <div className="col s3">
            {
                subjects.map(item=>{
                    return(
                    <div style={{margin:"5px",padding:"5px"}} className="card">
                        <h6>Sub: {item.subjectName}</h6>
                        <p>Prof: {item.teacherName}</p>
                    </div>
                    )
                })
            }
            </div>
                <div style={{margin:"5px",padding:"5px"}} className="col s8 offset-s3 card">
                    <h5 >Subject info</h5>
                    <table className="striped">
        <thead>
          <tr>
              <th>Subject</th>
              <th>Notification</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>DBMS</td>
            <td>Assignment 1</td>
          </tr>
          <tr>
            <td>Internet Programming</td>
            <td>IAT 1 results</td>
          </tr>
          <tr>
            <td>DBMS</td>
            <td>Exam time table</td>
          </tr>
        </tbody>
      </table>
            

                </div>
            </div>
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
        </div>
    )
}

export default EditClass
