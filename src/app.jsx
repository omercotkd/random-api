import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import checkLoggedIn from "./functions/isUserLogIn";

import Header from "./components/header/header.component";
import HomePage from "./pages/home/home.component";
import LoginPage from "./pages/login/login.component";
import RegisterPage from "./pages/register/register.component";
import MyAccount from "./pages/my account/myAccount.component";
import ChangePasswordPage from "./pages/change-password/change-password.component";
import ForegtPasswordPage from "./pages/forget password/forget-password.component";
import Footer from "./components/footer/footer.component";
import PageNotFound from "./pages/404Page/pageNotFound.component";


const App = () => {

    const [userLogedIn, setUserLogedIn] = useState(false);

    const [page404, setPage404] = useState(true);

    // on refresh the react will set the "userLogedIn" to false 
    // even if the account is connected in the backend so with this hook i check if he is connected or not
    useEffect(() => {
        checkLoggedIn()
        .then(res => {
            if (res){
                setUserLogedIn(true);
            }else {
                setUserLogedIn(false);
            };
        });
    }, []);

    return(
        <Router>
            {
                page404 && <Header userState={userLogedIn} setUserState={setUserLogedIn}/>
            }
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage userState={userLogedIn} setUserState={setUserLogedIn}/>}/>
                <Route path="/register" element={<RegisterPage userState={userLogedIn} setUserState={setUserLogedIn}/>}/>
                <Route path="/my-account" element={<MyAccount userState={userLogedIn} />}/>
                <Route path="/change-password" element={<ChangePasswordPage userState={userLogedIn}/>}/>
                <Route path="/forget-my-password" element={<ForegtPasswordPage/>}/>
                <Route path="*" element={<PageNotFound removeHeadFotter={setPage404}/>} />
            </Routes>
            {
                page404 && <Footer/>
            }
        </Router>
    )
}

export default App;