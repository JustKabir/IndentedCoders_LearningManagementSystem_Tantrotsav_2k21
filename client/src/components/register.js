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
        <div style={{ maxWidth: '70%', margin: '3vmin auto' }}>
            {/* <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{ color: '#F2D6EB' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#F2D6EB', margin: '0' }}>Register Teacher</h5>
            </div> */}

            <div className="row subnav" style={{ height: '8vmin', padding: '0 2vmin' }}>
                <ul>
                    <li className="col s3 center" style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/allClass" style={{ color: '#171717' }}>All Classes</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/createClass" style={{ color: '#171717' }}>Create Class</Link></li>
                    <li className="col s3 center active" style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/registerTeacher" style={{ color: '#171717' }}>Register Teacher</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin' }}><Link to="/addStudents" style={{ color: '#171717' }}>Add Students</Link></li>
                </ul>
            </div>

            <div className="card"
                style={
                    {
                        maxWidth: "400px",
                        padding: "10vmin",
                        margin: "auto",
                        textAlign: "center",
                        position: "relative",
                        transform: "translate(0, 20%)",
                        border: '1px solid #dfdfdf',
                        borderRadius: '4px',
                        backgroundColor: '#F0FFF3',
                    }
                }>
                <input
                    placeholder="Teacher Name"
                    type="text"
                    value={teacherName}
                    onChange={(e) => {
                        setTeacherName(e.target.value)
                    }}
                    style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '1.2rem', width: '100%', paddingLeft: '5px' }}
                />
                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '0.2rem', width: '100%', paddingLeft: '5px' }}
                />
                <button className="waves-effect waves-light btn large-btn"
                    onClick={() => createTeacher()}
                    style={{ marginTop: '1.2rem', backgroundColor: '#F2D6EB', color: '#171717' }}
                >
                    Register
                </button><br />
            </div>
        </div>
    );
}

export default Register;