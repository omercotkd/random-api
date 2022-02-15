import React from "react";

import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import logOutUser from "../../functions/logout.js";

import "./header.style.css";

const Header = (props) => {
    
    const navigate = useNavigate();

    const handleLogOut = ()=> {
        props.setUserState(false);
        logOutUser();
        navigate("/");
    };
    
    
    return(
        <header>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link to="/" className="links">Random API</Link></Navbar.Brand>
                <Nav className="nav-item"><Link to="/" className="links"> Docs </Link></Nav>
                {
                   props.userState ? 
                   <Nav className="nav-item"><button className="logout" onClick={handleLogOut}>Log Out</button></Nav>
                   
                   :
                   <Nav className="nav-item"><Link to="/login" className="links"> Login </Link></Nav>
                }
                {
                    props.userState ?
                    <Nav className="nav-item"><Link to="/my-account" className="links"> My account </Link></Nav>
                    :
                    <Nav className="nav-item"><Link to="/register" className="links"> Register </Link></Nav>
                }
                      
            </Navbar>
        </header>
    )

}
export default Header