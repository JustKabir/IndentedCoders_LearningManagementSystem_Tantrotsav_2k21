import {useState} from 'react'
import M from 'materialize-css'
import { useHistory} from 'react-router-dom'

function CreateClass() {
    const history =useHistory()
          const [classroomName,setClassroomName] = useState("")
          const createClass = ()=>{
              fetch("/createClass",{
                  method:"post",
                  headers:{
                      "Authorization":"Bearer "+localStorage.getItem("jwt"),
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                      classroomName
                  })
              }).then(res=>res.json())
              .then(data=>{
                  if(data.error){
                      M.toast({html:data.error, classes:"#c62828 red darken-3"})
                  }
                  else{
                      M.toast({html: "Class Created Successully", classes:"#43a047 green darken-1"})
                      history.push('/allClass')
                  }
              }).catch(error=>{
                  console.log(error)
              })
          }
    return (
          <div className="card" style={{maxWidth:'500px', padding: '10px' ,margin: '200px auto', textAlign: 'center'}}>
              <input 
              placeholder="Class Name" 
              type="text" 
              value={classroomName} 
              onChange={(e)=>{
                  setClassroomName(e.target.value)
                }}
              />
              <button className="waves-effect waves-light btn large-btn"
              onClick={()=>createClass()}
              >
                  Create Class
              </button><br/>
          </div>
    );
}

export default CreateClass
