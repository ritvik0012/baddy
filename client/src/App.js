import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Reset from './components/Reset';
//Try to get data from server
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("")

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = '/'  element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
        <Route path = '/login' element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
        <Route path = '/signup' element={<Signup />}></Route>
        <Route path = '/forgotPassword' element={<ForgotPassword />}></Route>
        <Route path = '/reset/:params' element={<Reset />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
  }


export default App;
