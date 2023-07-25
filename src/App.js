import React from 'react'

//style sheets
import './App.css';

//custom components
import { ContextState } from './ContextApi/ContextApi.jsx';
import Body from './Components/Body';
import Navbar from './Components/Navbar';
import Login from './Pages/Login.jsx';

const App = () => {

  const { userName } = ContextState();

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
