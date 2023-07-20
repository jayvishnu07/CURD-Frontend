import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


import TaskContextProvider from './ContextApi/ContextApi';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <TaskContextProvider>
            <App />
        </TaskContextProvider>
        <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </Router>
);

