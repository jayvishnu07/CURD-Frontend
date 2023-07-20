import './App.css';
import Body from './Components/Body';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import { ContextState } from './ContextApi/ContextApi.jsx';
import { useEffect, useState } from 'react';



function App() {

  const { userName } = ContextState();


  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(localStorage.getItem('userName'))
    console.log("logged");
  }, [userName])


  return (
    <div className="App">
      {
        userName
          ?
          <div className='main_body'>
            <Navbar />
            <Body />
          </div>
          :
          <Login />
      }

    </div>
  );
}

export default App;

// https://todoist.com/app/today