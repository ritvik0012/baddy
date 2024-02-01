import React from "react"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        // You'll update this function later
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
            {(localStorage.user ? <div>
                Welcome! {user.email}
            </div> : <div/>)}
        </div>


    </div>
}

export default Home