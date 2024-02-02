import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if(userData && !userData.admin){
            navigate('/');
        }
      });
    
    const onButtonClick = () => {
        if(localStorage.user){
            localStorage.removeItem("user");
            navigate('/')
        }
        else{
            navigate('/login');
        }
    }

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the home page.
        </div>
        <div className={"buttonContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={localStorage.user ? "Log out" : "Log in"} />
                <input
                className={"inputButton"}
                type="button"
                value={"Add schedule"} />
                <input
                className={"inputButton"}
                type="button"
                value={"View Bookings"} />
            {(localStorage.user ? <div>
                Welcome! {user.email}
            </div> : <div/>)}
        </div>


    </div>
}

export default Admin