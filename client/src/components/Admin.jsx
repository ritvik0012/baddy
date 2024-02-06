import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
    const navigate = useNavigate();

    const [addSession, setAddSession] = useState(false);
    const [court, setCourt] = useState('');
    const [time, setTime] = useState('');
    const [timeError] = useState();

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

    const handleRadio = (event) => {
        setCourt(event.target.value);
    }

    const onScheduleClick = () => {
        if(!time || !court ){
            window.alert("Booking fields are empty!")
        }
        else{
            console.log('do post request here');
            axios.post("http://localhost:8080/booking", {startTime: time, court: court})
                    .then((response) => {
                        if(response.data.message === 'success'){
                            window.alert('successfully added slot!');
                            setAddSession(!addSession);
                        }
                        else{
                            window.alert('slot already exists!')
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });

    }
}

    const addSchedule = () => {
        setAddSession(!addSession);
    }

    return <div className="mainContainer">
        <div className={"titleContainer"}>
            <div>Welcome!</div>
        </div>
        <div>
            This is the Admin Page.
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
                value={"Add schedule"} 
                onClick={addSchedule}/>
                <input
                className={"inputButton"}
                type="button"
                value={"View Bookings"} />
            {(addSession && <div className="mainContainer"><div className={"inputContainer"}>
            <input
                value={time}
                type="datetime-local"
                className={"inputBox"}
                onChange={ev => setTime(ev.target.value)} 
                required />
            <label className="errorLabel">{timeError}</label>
            <br />
            <label>Choose Court</label>
            <br />
            <label>
                Court 1
            <input
                value="1"
                type="radio"
                onChange={handleRadio} 
                checked={court === "1"}
                required />
            </label>
            <label>
                Court 2
            <input
                value="2"
                type="radio"
                onChange={handleRadio} 
                checked={court === "2"}
                required />
            </label>
            <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onScheduleClick}
                value={"Add Schedule"} />
        </div>
        </div></div>)}
        </div>


    </div>
}

export default Admin