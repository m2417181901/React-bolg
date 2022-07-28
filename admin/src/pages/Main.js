import React from "react";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Adminindex from "./AdminIndex";
function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />} ></Route>
                <Route path="/adminindex//*" exact element={<Adminindex />} ></Route>
            </Routes>
           
        </BrowserRouter>
    )
}

export default Main;