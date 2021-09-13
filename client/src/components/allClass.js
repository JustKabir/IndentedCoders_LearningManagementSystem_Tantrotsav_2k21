import { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function AllClass() {
    const [classes, setClasses] = useState([])
    const history = useHistory()
    useEffect(()=>{
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
        <div className="container">
            <div className="row">
                {
                    classes.map(item=>{
                        const url = `/class/${item.classroomName}`
                        return(
                            <div className="card col s12 m3">
                                <h3>{item.classroomName}</h3>
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
    )
}

export default AllClass
