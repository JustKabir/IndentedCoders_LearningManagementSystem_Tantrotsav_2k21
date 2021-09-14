import { useState, useEffect } from 'react'
import M from 'materialize-css'
import { useHistory, Link } from 'react-router-dom'

function CreateClass() {
    useEffect(() => {
        M.AutoInit()
    }, [])
    const history = useHistory()
    const [classroomName, setClassroomName] = useState("")
    const createClass = () => {
        fetch("/createClass", {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                classroomName
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Class Created Successully", classes: "#43a047 green darken-1" })
                    history.push('/allClass')
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
                <h5 className='center col s10' style={{ color: '#9ab7ca' }}>Create Class</h5>
            </div>
            <div className="card" style={
                {
                    maxWidth: "500px",
                    height: "200px",
                    padding: "50px",
                    margin: "auto",
                    textAlign: "center",
                    position: "relative",
                    top: "50%",
                    transform: "translate(0, 60%)",
                    backgroundColor:'#ffe7d9'
                }
            }>
                <input
                    placeholder="Class Name"
                    type="text"
                    value={classroomName}
                    onChange={(e) => {
                        setClassroomName(e.target.value)
                    }}
                />
                <button className="waves-effect waves-light btn large-btn"
                    onClick={() => createClass()}
                    style={{ marginTop: '30px', backgroundColor: '#9ab7ca', color: 'black' }}
                >
                    Create Class
                </button><br />
            </div>
        </div>
    );
}

export default CreateClass
