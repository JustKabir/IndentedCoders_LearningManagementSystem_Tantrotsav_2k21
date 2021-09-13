import {useState,useEffect} from 'react'
import M from 'materialize-css'
import { useHistory,Link } from 'react-router-dom'

function Register() {
    useEffect(()=>{
        M.AutoInit()
    },[])
    const history =useHistory()
    const [teacherName,setTeacherName] = useState("")
    const [password,setPassword] = useState("")
    const createTeacher = ()=>{
        fetch("/registerTeacher",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                teacherName,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html:data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/registerTeacher')
            }
        }).catch(error=>{
            console.log(error)
        })
    }
    return (
        <div>
        <ul id="slide-out" class="sidenav">
        <li><Link to="/allClass">All Class</Link></li>
        <li><Link to="/createClass">Create Class</Link></li>
        <li><Link to="/registerTeacher">Register Teacher</Link></li>
    </ul>
    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
  
      <div className="card" style={{maxWidth:'500px', padding: '10px' ,margin: '200px auto', textAlign: 'center'}}>
          <input 
          placeholder="Teacher Name" 
          type="text" 
          value={teacherName} 
          onChange={(e)=>{
              setTeacherName(e.target.value)
            }}
          />
          <input 
          placeholder="password" 
          type="password"
          value={password} 
          onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />
          <button className="waves-effect waves-light btn large-btn"
          onClick={()=>createTeacher()}
          >
              Register
          </button><br/>
      </div>
      </div>
    );
  }
  
  export default Register;