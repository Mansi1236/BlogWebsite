import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import { useState } from 'react';
import {signOut} from 'firebase/auth';
import {auth} from './firebase-config.js';

function App() {

  const [isAuth, setAuth] = useState(localStorage.getItem("isAuth"));
 

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setAuth(false)
     window.location.pathname="/login";
    })
  }

  return (
   
    <Router>
        <nav>
 <Link to="/">Home</Link>

 { !isAuth ? (<Link to="/login">Login</Link> ) :
 
 ( <> 
  <Link to="/post">Post Something!</Link>
 <button onClick={signUserOut}>  Log Out</button> 
 </>
 )}
        </nav>

      <Routes>
      <Route path="/" element={<Home isAuth={isAuth} />}/>
      <Route path="/post" element={< CreatePost isAuth={isAuth}/>}/>    
      <Route path="/login" element={<Login setAuth={setAuth}/>}/> 
      </Routes>

    </Router>

   
  );
}

export default App;
