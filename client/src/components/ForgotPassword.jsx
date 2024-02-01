import React, {useState} from 'react';
import axios from 'axios';
import {Link } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [emailError] = useState("");
  //TODO: add input validations
  const onButtonClick = () => {
    axios.post("http://localhost:8080/forgotPassword", {email:email})
            .then((response) => {
                  console.log(response.data);
                  if(response.data.message === 'success'){
                    window.alert("Link to change password is sent to your email id!");
                  }
                  else{
                    window.alert('The entered email id does not exist!');
                  }
             })
            .catch((err) => {
                  console.log(err);
             });
  }

    return(
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Change Password</div>
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
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"GET LINK"} />
        </div>
        <div>Go to <Link to={'/'}>HOMEPAGE</Link></div>
    </div>

    )
}
export default ForgotPassword;