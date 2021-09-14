import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import M from 'materialize-css'
const axios = require("axios")

function AddStudents() {
    const [user, setUser] = useState([])
    const [file, setFile] = useState("")
    const history = useHistory()

    useEffect(() => {
        M.AutoInit();
    }, [])


    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    'Content-Type': 'multipart/form-data'
                }
            });
            const { message } = res.data
        } catch (err) {
            console.log("something went wrong")
        }
    }
    return (
        <>
            <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{ color: '#9ab7ca' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#9ab7ca' }}>Add Students</h5>
            </div>

            <div className="row">
                <form className="col s8 offset-s2 card" onSubmit={onSubmit} style={
                    {
                        maxWidth: "500px",
                        height: "250px",
                        padding: "50px",
                        margin: "auto",
                        textAlign: "center",
                        position: "relative",
                        left: '50%',
                        top: "50%",
                        transform: "translate(-50%, 60%)",
                        backgroundColor: '#ffe7d9'
                    }
                }>
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>File</span>
                            <input
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ backgroundColor: '#9ab7ca', color: 'black' }}
                            />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" />
                        </div>
                    </div>
                    <br />
                    <input
                        type="submit"
                        className="waves-effect waves-light btn large-btn right"
                        style={{ marginTop: '10px', backgroundColor: '#9ab7ca', color: 'black' }}
                    >
                    </input>
                </form><br />

            </div>
        </>
    )
}

export default AddStudents
