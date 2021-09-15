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
        <div style={{ maxWidth: '70%', margin: '3vmin auto' }}>
            {/* <div className='row' style={{ padding: '10px !important' }}>
                <ul id="slide-out" className="sidenav">
                    <li><Link to="/allClass">All Class</Link></li>
                    <li><Link to="/createClass">Create Class</Link></li>
                    <li><Link to="/registerTeacher">Register Teacher</Link></li>
                    <li><Link to="/addStudents">Add Students</Link></li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger col s1"><i className="material-icons" style={{ color: '#F2D6EB' }}>menu</i></a>
                <h5 className='center col s10' style={{ color: '#F2D6EB', margin: '0' }}>All Classes</h5>
            </div> */}
            <div className="row subnav" style={{height:'8vmin', padding:'0 2vmin'}}>
                <ul>
                    <li className="col s3 center active" style={{height:'8vmin', lineHeight:'8vmin', borderRight:'1px solid #d5d5d5'}}><Link to="/allClass" style={{color:'#171717'}}>All Classes</Link></li>
                    <li className="col s3 center "  style={{height:'8vmin', lineHeight:'8vmin', borderRight:'1px solid #d5d5d5'}}><Link to="/createClass" style={{color:'#171717'}}>Create Class</Link></li>
                    <li className="col s3 center "  style={{height:'8vmin', lineHeight:'8vmin', borderRight:'1px solid #d5d5d5'}}><Link to="/registerTeacher" style={{color:'#171717'}}>Register Teacher</Link></li>
                    <li className="col s3 center "  style={{height:'8vmin', lineHeight:'8vmin'}}><Link to="/addStudents" style={{color:'#171717'}}>Add Students</Link></li>
                </ul>
            </div>
            <div className="container" style={{ width: '100%' }}>
                <div className="row">
                    {
                        classes.map(item => {
                            const url = `/class/${item.classroomName}`
                            return (
                                <div style={{ padding: "15px 25px", width: '31%', margin: '1%', height: 'auto' }} className="card col l4 allclass-card">
                                    <h6 className='center'>{item.classroomName}</h6>
                                    <button className="waves-effect waves-light btn"
                                        onClick={() => {
                                            history.push(`/class/${item.classroomName}`)
                                        }}
                                        style={{color: '#171717', marginTop: '10px', position: 'relative', left: '50%', transform: 'translate(-50%)', marginBottom: '2vmin', height: '6vmin', lineHeight: '6vmin', backgroundColor: '#F2D6EB' }}>
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
