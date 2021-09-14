import { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory, Link } from 'react-router-dom'

function Register() {
    useEffect(() => {
        M.AutoInit()
    }, [])
    const history = useHistory()
    const [teacherName, setTeacherName] = useState("")
    const [password, setPassword] = useState("")
    const createTeacher = () => {
        fetch("/registerTeacher", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teacherName,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    history.push('/registerTeacher')
                }
            }).catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{ color: '#9ab7ca' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#9ab7ca' }}>Register Teacher</h5>
            </div>

            <div className="card"
                style={
                    {
                        maxWidth: "500px",
                        height: "250px",
                        padding: "50px",
                        margin: "auto",
                        textAlign: "center",
                        position: "relative",
                        top: "50%",
                        transform: "translate(0, 60%)",
                        backgroundColor: '#ffe7d9'
                    }
                }>
                <input
                    placeholder="Teacher Name"
                    type="text"
                    value={teacherName}
                    onChange={(e) => {
                        setTeacherName(e.target.value)
                    }}
                />
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <button className="waves-effect waves-light btn large-btn"
                    onClick={() => createTeacher()}
                    style={{ marginTop: '30px', backgroundColor: '#9ab7ca', color: 'black' }}
                >
                    Register
                </button><br />
            </div>
        </div>
    );
}

export default Register;