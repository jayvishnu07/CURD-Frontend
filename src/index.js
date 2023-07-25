import React from 'react';
import ReactDOM from 'react-dom/client';

//libraries
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

//style sheets
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

//custom components
import App from './App';
import TaskContextProvider from './ContextApi/ContextApi';

//axios base URL

axios.defaults.baseURL = `http://localhost:8080/api`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <TaskContextProvider>
            <App />
        </TaskContextProvider>
        <ToastContainer
            position="top-right"
            autoClose={true}
            hideProgressBar={false}
            rtl={false}
            draggable
            theme="colored"
        />
    </Router>
);


