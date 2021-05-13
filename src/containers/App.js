import React from "react";


import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './Home';



const App = () => {
    return (
        <BrowserRouter>
            <Home />
            <ToastContainer />
        </BrowserRouter>
    );
};

export default App;
