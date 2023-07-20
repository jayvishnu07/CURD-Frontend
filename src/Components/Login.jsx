import '../Css/Component.style/Login.css';
import { useState } from 'react';

//web.archieve.org
import { ContextState } from '../ContextApi/ContextApi';

// import image1 from '../assets/8401.jpg'
import image2 from '../assets/8401.webp'

import { FaGoogle } from "react-icons/fa";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

function App() {

    const { setUserName } = ContextState();
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleUserClick = () => {
        if (name && password) {
            setUserName(name);
            localStorage.setItem('userName', name);
            toast.success(<b style={{ color: "#000" }} >Login successful.</b>, {
                className: css({
                    background: "#pink"
                })
            }, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: true,
                theme: "colored",
            });
        }
        else {
            toast.warn(<b style={{ color: "#000" }} >Please fill all the fields.</b>, {
                className: css({
                    background: "#pink"
                })
            }, {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: true,
                theme: "colored",
            });
        }
    }

    return (
        <div className="App">
            {
                (

                    <div className="login_wrapper">
                        <div className="join-container-div">
                            <h2>Task Manager</h2>

                            <div className="login-google-button" >
                                <div className="login-google-icon">
                                    <FaGoogle />
                                </div>
                                <h4 className='login-google-title'>Sign-In with Google</h4>
                            </div>
                            <div className="login-type-seporator">
                                -------------------- (Or) --------------------
                            </div>

                            <input type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
                            <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                            <button onClick={handleUserClick} > Login </button>
                        </div>
                        <div className="image">
                            <img src={image2} alt="" srcset="" />
                        </div>
                    </div>

                )
            }
        </div >
    );
}

export default App;