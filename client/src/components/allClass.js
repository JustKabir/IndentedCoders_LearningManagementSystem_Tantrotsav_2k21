import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import M from 'materialize-css'

function AllClass() {
    const [classes, setClasses] = useState([])
    const history = useHistory()
    useEffect(()=>{
        M.AutoInit()
        fetch('/allClass',{
            method:"get",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt"),
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            setClasses(result)
            console.log(result)
        })
    },[])
    return (
        <div>
        <ul id="slide-out" class="sidenav">
            <li><Link to="/allClass">All Class</Link></li>
            <li><Link to="/createClass">Create Class</Link></li>
            <li><Link to="/registerTeacher">Register Teacher</Link></li>
        </ul>
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <div className="container">
            <div className="row">
                {
                    classes.map(item=>{
                        const url = `/class/${item.classroomName}`
                        return(
                            <div className="card col s12 m3">
                                <h6>{item.classroomName}</h6>
                                <button className="waves-effect waves-light btn large-btn"
                                onClick={()=>{
                                    history.push(`/class/${item.classroomName}`)
                                    }}>
                                Edit class
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default AllClass
