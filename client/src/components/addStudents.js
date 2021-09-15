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
        <div style={{ maxWidth: '70%', margin: '3vmin auto' }}>
            {/* <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" class="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" class="sidenav-trigger col s1"><i class="material-icons" style={{ color: '#F2D6EB' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#F2D6EB', margin: '0' }}>Add Students</h5>
            </div> */}

            <div className="row subnav" style={{ height: '8vmin', padding: '0 2vmin' }}>
                <ul>
                    <li className="col s3 center" style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/allClass" style={{ color: '#171717' }}>All Classes</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/createClass" style={{ color: '#171717' }}>Create Class</Link></li>
                    <li className="col s3 center " style={{ height: '8vmin', lineHeight: '8vmin', borderRight: '1px solid #d5d5d5' }}><Link to="/registerTeacher" style={{ color: '#171717' }}>Register Teacher</Link></li>
                    <li className="col s3 center active" style={{ height: '8vmin', lineHeight: '8vmin' }}><Link to="/addStudents" style={{ color: '#171717' }}>Add Students</Link></li>
                </ul>
            </div>

            <div className="row">
                <form className="col s8 offset-s2 card" onSubmit={onSubmit} style={
                    {
                        maxWidth: "400px",
                        padding: "10vmin",
                        margin: "auto",
                        textAlign: "center",
                        position: "relative",
                        left: '50%',
                        transform: "translate(-50%, 25%)",
                        border: '1px solid #dfdfdf',
                        borderRadius: '4px',
                        backgroundColor: '#F0FFF3',
                    }
                }>
                    <div class="file-field input-field">
                        <div class="btn" style={{ backgroundColor: '#F2D6EB', color: '#F2D6EB', height: '2.5rem', lineHeight: '2.5rem' }}>
                            <span>File</span>
                            <input
                                type="file"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', width: '100%', paddingLeft: '5px' }} />
                        </div>
                    </div>
                    <br />
                    <input
                        type="submit"
                        className="waves-effect waves-light btn large-btn right"
                        style={{ backgroundColor: '#F2D6EB', color: '#171717' }}
                    >
                    </input>
                </form><br />

            </div>
        </div>
    )
}

export default AddStudents
