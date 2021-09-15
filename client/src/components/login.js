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
        <div className="card login-card"
            style={
                {
                    maxWidth: "400px",
                    height: "330px",
                    padding: "10px",
                    margin: "auto",
                    textAlign: "center",
                    position: "relative",
                    transform: "translate(0, 25%)",
                    border: '1px solid #dfdfdf',
                    borderRadius: '4px',
                    backgroundColor: '#F0FFF3',
                }
            } >
            <div style={{ padding: '0 50px' }}>
                <h3>Login</h3>
                <input placeholder="Name"
                    type="text"
                    value={name}
                    onChange={
                        (e) => {
                            setName(e.target.value);
                        }
                    }
                    style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '1.2rem', width: '100%', paddingLeft: '5px' }}
                />{" "}
                <input placeholder="Password"
                    type="password"
                    value={password}
                    onChange={
                        (e) => {
                            setPassword(e.target.value);
                        }
                    }
                    style={{ backgroundColor: '#ffffff', border: '1px solid #dfdfdf', borderRadius: '4px', height: '2.5rem', marginTop: '0.2rem', width: '100%', paddingLeft: '5px' }}
                /> {" "}
                <button className="waves-effect waves-light btn large-btn"
                    onClick={
                        () => signInUser()} style={{ marginTop: '1.2rem', backgroundColor: '#F2D6EB', color: '#F2D6EB', width: '102%' }} >
                    Sign IN {" "}
                </button>{" "}
            </div>{" "}
        </div>
    );
}

export default Login;