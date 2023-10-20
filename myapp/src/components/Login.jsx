import React from 'react';
import {auth, provider} from '../firebase-config';
import  {signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({setAuth}) {


  let navigate = useNavigate();

  const signInwithGoogle = () => {
signInWithPopup(auth, provider). then((result) => {
  localStorage.setItem("isAuth", true);
  setAuth(true) 
  navigate("/");
})


  }

  return (
    <div className='loginPage'>
<p> Sign in withh Google to continue</p>
<button className='login-with-google-btn' onClick={signInwithGoogle}>
  Sign in with Google
</button>



    </div>
  )
}

export default Login;