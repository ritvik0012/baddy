import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Signup = (props) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const onButtonClick = () => {
    if(!email || !password || !username){
        window.alert('fields are empty');
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        window.alert('invalid email format');
    }
    else{
        axios.post("http://localhost:8080/signup", {username:username,email:email,password:password})
                .then((response) => {
                    console.log(response.data);
                    if(response.data.message === 'success'){
                        window.alert('Successfully registered user');
                        navigate('/');
                    }
                    else{
                        window.alert('EMAIL ALREADY EXISTS');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            }
  }

    return(
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>SIGNUP</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                type="email"
                placeholder="Enter your email here"
                className={"inputBox"}
                onChange={ev => setEmail(ev.target.value)} 
                required />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={username}
                placeholder="Enter your username here"
                className={"inputBox"}
                onChange={ev => setUsername(ev.target.value)} 
                required />
            <label className="errorLabel">{usernameError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                type="password"
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"SIGNUP"} />
        </div>
        <div>Already have an account? <Link to={"/login"}>login</Link></div>
        <div>Go to <Link to={'/'}>HOMEPAGE</Link></div>
    </div>

    )
}
export default Signup;