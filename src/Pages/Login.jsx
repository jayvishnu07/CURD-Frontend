import React, { useEffect, useState } from 'react'

//image source from assests
import login_image from '../assets/login_image.webp'

//style sheets
import '../Css/Pages.style/Login.css';

//custom components
import { ContextState } from '../ContextApi/ContextApi';

//react icons
import { FaGoogle } from "react-icons/fa";


function App() {

  const { setUserName } = ContextState();
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  //state to disable enter button 
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true)

  // Function to handle login
  const handleLoginClick = () => {
    if (name && password) {
      setUserName(name);
      localStorage.setItem('userName', name);
    }
  }

  useEffect(() => {
    if (name && password) {
      setIsLoginButtonDisabled(false)
    }
    else {
      setIsLoginButtonDisabled(true)
    }
  }, [name, password])

  return (
    <div className="App">
      <div className="login_wrapper">
        <div className="login_container_div">
          <h2>Task Manager</h2>
          <div className="login_google_button">
            <div className="login_google_icon">
              <FaGoogle />
            </div>
            <h4 className="login_google_title">Sign-in with google</h4>
          </div>
          <div className="login_type_separator">-------------------- (Or) --------------------</div>
          <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button disabled={isLoginButtonDisabled} onClick={handleLoginClick}>Login</button>
        </div>
        <div className="image">
          <img src={login_image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default App;