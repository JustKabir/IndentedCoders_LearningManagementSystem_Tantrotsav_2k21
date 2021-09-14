import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import M from 'materialize-css'

function AllClass() {
    const [classes, setClasses] = useState([])
    const history = useHistory()
    useEffect(() => {
        M.AutoInit()
        fetch('/allClass', {
            method: "get",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(result => {
                setClasses(result)
                console.log(result)
            })
    }, [])
    return (
        <div>
            <div className='row' style={{padding:'10px !important'}}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{color:'#9ab7ca'}}>menu</i></a>
                <h5 className='center col s10' style={{color:'#9ab7ca'}}>All Classes</h5>
            </div>
            <div className="container">
                <div className="row">
                    {
                        classes.map(item => {
                            const url = `/class/${item.classroomName}`
                            return (
                                <div style={{ padding: "15px auto", width:'30%', margin:'1%', height:'100px', backgroundColor:'#ffe7d9' }} className="card col l4">
                                    <h6>{item.classroomName}</h6>
                                    <button className="waves-effect waves-light btn large-btn"
                                        onClick={() => {
                                            history.push(`/class/${item.classroomName}`)
                                        }}
                                        style={{backgroundColor:'#9ab7ca', color:'black', marginTop: '10px'}}>
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
