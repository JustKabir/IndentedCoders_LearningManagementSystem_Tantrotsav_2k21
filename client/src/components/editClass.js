import React, { useEffect, useState } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'

function EditClass() {
    const history = useHistory()
    const { id } = useParams()
    const [subjectName, setSubjectName] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [activeSub, setActiveSub] = useState("")
    const [userType, setUserType] = useState(false)
    const [subjects, setSubjects] = useState([])
    const addSubject = () => {
        fetch("/addSubject", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                subjectName,
                teacherName
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Subject Added Successully", classes: "#43a047 green darken-1" })
                    history.push(`/class/${id}`)
                }
            }).catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (localStorage.getItem("type") == "ADMIN") {
            setUserType(true)
            console.log(userType)
        }
        fetch('/classSubject', {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        }).then(res => res.json())
            .then(result => {
                setSubjects(result)
                console.log(subjects)
            })
        M.AutoInit()
    }, [])
    return (
        <div style={{ maxWidth: '70%', margin: '3vmin auto' }}>
            {/* <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{ color: '#F2D6EB' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#F2D6EB', margin: '0' }}>Edit Class</h5>
            </div> */}

            <div className="row subnav" style={{ height: '8vmin', padding: '0 2vmin' }}>
                <ul>
                    <li className="col s3 center active" style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/allClass" style={{ color: '#171717' }}>All Classes</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/createClass" style={{ color: '#171717' }}>Create Class</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/registerTeacher" style={{ color: '#171717' }}>Register Teacher</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin' }}><Link to="/addStudents" style={{ color: '#171717' }}>Add Students</Link></li>
                </ul>
            </div>

            <div className="container" style={{ width: '100%' }}>
                <p style={{ color: '#11CBD7', marginBottom: '0', marginLeft: '3vmin', fontSize: '2rem' }}>{id}</p>
                <div className="row">
                    <div className="col s3">
                        {
                            subjects.map(item => {
                                return (
                                    <div style={{ margin: "5px", padding: "5px", boxShadow: 'none', border: '1px solid #e5e5e5', backgroundColor: '#C6F1E7' }} className="card">
                                        <p>Sub: {item.subjectName}</p>
                                        <p>Prof: {item.teacherName}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{ margin: "5px", padding: "5px", boxShadow: 'none', border: '1px solid #e5e5e5', backgroundColor: '#C6F1E7' }} className="col s8 offset-s3 card">
                        <h5 >Subject info</h5>
                        <table style={{ backgroundColor: '#F0FFF3' }}>
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
                <button data-target="modal1" className="btn modal-trigger right" style={{ marginTop: '0.7rem', backgroundColor: '#F2D6EB', color: '#171717', marginRight: '12vmin', marginBottom: '10vmin' }}>Add Subject</button>

                <div id="modal1" className="modal" style={
                    {
                        maxWidth: "400px",
                        padding: "10vmin",
                        margin: "auto",
                        textAlign: "center",
                        border: '1px solid #dfdfdf',
                        borderRadius: '4px',
                        backgroundColor: '#F0FFF3',
                    }
                }>
                    <div class="modal-content">
                        <input
                            placeholder="Subject Name"
                            type="text"
                            value={subjectName}
                            onChange={(e) => {
                                setSubjectName(e.target.value)
                            }}
                            style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '1.2rem', width: '100%', paddingLeft: '5px' }}
                        />
                        <input
                            placeholder="Teacher Name"
                            type="text"
                            value={teacherName}
                            onChange={(e) => {
                                setTeacherName(e.target.value)
                            }}
                            style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '1.2rem', width: '100%', paddingLeft: '5px'}}
                        />
                    </div>
                    <div class="modal-footer" style={{backgroundColor:'#F0FFF3'}}>
                        <button className="waves-effect waves-light btn large-btn"
                            onClick={() => addSubject()}
                            style={{ marginTop: '10px', backgroundColor: '#F2D6EB', color: '#171717', marginRight: '5vmin', marginRight: '2vmin'  }}>
                            Add Subject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditClass
