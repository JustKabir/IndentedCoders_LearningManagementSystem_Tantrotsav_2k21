import { useState, useContext } from "react";
import M from "materialize-css";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../App";

function Login() {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const signInUser = () => {
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    dispatch({ type: "USER", payload: data.user });
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    if (data.type == "ADMIN") {
                        localStorage.setItem("type", JSON.stringify(data.type));
                        M.toast({
                            html: "Welcome Admin",
                            classes: "#43a047 green darken-1",
                        });
                        history.push("/allClass");
                    } else if (data.type == "TEACHER") {
                        localStorage.setItem("type", JSON.stringify(data.type));
                        M.toast({
                            html: `Welcome Professor`,
                            classes: "#43a047 green darken-1",
                        });
                        history.push("/protectedResource");
                    } else if (data.type == "STUDENT") {
                        localStorage.setItem("type", JSON.stringify(data.type));
                        M.toast({
                            html: `Welcome Student`,
                            classes: "#43a047 green darken-1",
                        });
                        history.push(`/class/${data.user.studentClass}`);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="card"
            style={
                {
                    maxWidth: "500px",
                    height: "330px",
                    padding: "10px",
                    margin: "auto",
                    textAlign: "center",
                    position: "relative",
                    top: "50%",
                    transform: "translate(0, 50%)",
                    backgroundColor:'#ffe7d9'
                }
            } >
            <div style={{padding:'0 50px'}}>
                <h3>Login</h3>
                <input placeholder="Name"
                    type="text"
                    value={name}
                    onChange={
                        (e) => {
                            setName(e.target.value);
                        }
                    }
                />{" "}
                <input placeholder="Password"
                    type="password"
                    value={password}
                    onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    }
                /> {" "}
                <button className="waves-effect waves-light btn large-btn"
                    onClick={
                        () => signInUser()} style={{marginTop:'30px', backgroundColor:'#9ab7ca', color:'black'}} >
                    Sign IN {" "}
                </button>{" "}
            </div>{" "}
        </div>
    );
}

export default Login;