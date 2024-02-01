import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from "react-router-dom";

const Reset = () => {

  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const navigate = useNavigate();
  const {params} = useParams();
    console.log(params);
  //TODO: add input validations
  const onButtonClick = () => {
    if(!password){
        window.alert('Password field cannot be left empty!');
    }
    else{
        axios.post(`http://localhost:8080/reset/${params}`, {password:password})
            .then((response) => {
                  console.log(response.data);
                  if(response.data.message === 'success'){
                    window.alert("Password successfully changed!");
                    navigate('/');
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
            <div>Reset Password</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={password}
                placeholder="Enter your email here"
                className={"inputBox"}
                onChange={ev => setPassword(ev.target.value)} 
                required />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"CHANGE PASSWORD"} />
        </div>
        <div>Go to <Link to={'/'}>HOMEPAGE</Link></div>
    </div>

    )
}
export default Reset;