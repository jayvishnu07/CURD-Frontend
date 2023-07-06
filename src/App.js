import './App.css';
import Body from './Components/Body';
import Navbar from './Components/Navbar';

import TaskContextProvider from './ContextApi/ContextApi';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <TaskContextProvider>
          <Navbar />
          <Body />
        </TaskContextProvider>
      </Router>
    </div>
  );
}

export default App;

// https://todoist.com/app/today