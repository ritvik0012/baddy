import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  //TODO: add input validations
  const onButtonClick = () => {
    axios.post("http://localhost:8080/login", {email:email,password:password})
            .then((response) => {
                  console.log(response.data);
                  if(response.data.message === 'success'){
                    let user = response.data.user;
                    localStorage.setItem("user", JSON.stringify({email:user.email,password:user.password,token:response.data.token}));
                    props.setEmail(user.username);
                    props.setLoggedIn(true);
                    navigate('/');
                  }
                  else{
                    window.alert('Incorrect username or password');
                  }
             })
            .catch((err) => {
                  console.log(err);
             });
  }

    return(
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                className={"inputBox"}
                onChange={ev => setEmail(ev.target.value)} 
                required />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                type="password"
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} 
                required />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
        <div>forgot <Link to={'/forgotPassword'}>password</Link></div>
        <div>create an account <Link to={"/signup"}>signup</Link></div>
        <div>Go to <Link to={'/'}>HOMEPAGE</Link></div>
    </div>

    )
}
export default Login;