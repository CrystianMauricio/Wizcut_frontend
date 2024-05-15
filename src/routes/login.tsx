import { Link, Redirect } from "react-router-dom";
import styles from "./login.module.css";
import GoogleLogin from 'react-google-login';
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router'


export default function Login(props:
    {
        projectUser: string;
        setProjectUser: (user: string) => void;
    }) {
        const history = useHistory();
        const [username, setusername] = useState<string>("");
        const [password, setpassword] = useState<string>("");
    const unsuccessfulLogin = (response: any) => {
        console.log("Login process terminated");
    }
    const submit = () =>{
        if(username=="admin"&&password=="wizcutlogin"){

            console.log("cccmmmdddd");
            localStorage.setItem('Loginresult', 'success');
            localStorage.setItem('contentss', "<screen id=0");
            history.go(0);
        }else
        alert("You are uncorrect User");

        
        console.log(username+password);
        // console.log(data);
    }
    const handleLogin = (response: any) => {
        sessionStorage.setItem("token", response.tokenId);
        const instance = axios.create({ baseURL: "http://localhost:8000" });
        instance.get("/getEmail", { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }).then((res) => {
            props.setProjectUser(res.data.email);
        });
    }

    return (
        <div className={styles.container}>
            <div></div>
            <div className={styles.login}>
                <div className={styles.loginBox}>
                    <Link to="/"><img className={styles.logo} src="/logo192.png" /></Link>
                    {/* <button className={styles.button} title="Sign in with Google">
                    <img className={styles.google} src="/google.svg"/> Sign in with Google
                </button> */}
                    <input type="text" value={username} style={{borderRadius:'5px'}}
                    onChange={(e) => setusername(e.target.value)} placeholder="Input username"/>

                    <input type= "password" style={{borderRadius:'5px'}} value = {password} onChange={(e) => setpassword(e.target.value)} placeholder="input password"/>
                    <button 
                    style={{color:"blue",marginLeft:'40%'}}
                    onClick={() => {
                        submit();
                    }}
                        >Login</button>
                    <GoogleLogin
                        clientId="956647101334-784vc8rakg2kbaeil4gug1ukefc9vehk.apps.googleusercontent.com"
                        render={renderProps => (
                            <button className={styles.button} onClick={renderProps.onClick} disabled={renderProps.disabled} title="Sign in with Google">
                                <img className={styles.google} src="/google.svg" /> Sign in with Google
                            </button>
                        )}
                        buttonText="Login"
                        onSuccess={handleLogin}
                        onFailure={unsuccessfulLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>);
}
