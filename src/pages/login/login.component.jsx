import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import FormInput from "../../components/form-input/form-input.component";
import SubmitButton from "../../components/button/submitButton.component";
import emailValidation from "../../functions/emailValditon";
import passwordValditor from "../../functions/passwordValditon";
import logInUser from "../../functions/login";
import "./login.style.css";

const LoginPage = (props) => {

    const navigate = useNavigate();

    if (props.userState){
        navigate("/");
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setUserInfo(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...userInfo[name],
                    value: value,
   
                }
            }
        ));
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        // checks if there r any empty fields
        let fieldAmpty = false;
        for(const item in userInfo){
            if(userInfo[item].value === ""){
                fieldAmpty = true
            };
        };
        
        // all this valditon is to save server proccing if the data from the first place cant be a user
        if(fieldAmpty){
            alert("There are empty fields")
            return false;
        };
        
        if(!emailValidation(userInfo.email.value)){
            return false;
        }else if(!passwordValditor(userInfo.password.value)){
            return false;
        };

        const userToLogin = new Object({
            email: userInfo.email.value,
            password: userInfo.password.value
        });

        
        logInUser(userToLogin)
        .then(res => {
            if (res){
                props.setUserState(true);
            }else{
                null
            }
        });


    };

    const handleForgetRedirect = (event) => {
        event.preventDefault();
        navigate("/forget-my-password")
        return;
    }

    const [userInfo, setUserInfo] = useState({
        email: {
            name: "email",
            placeholder: "Email",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        password: {
            name: "password",
            placeholder: "Password",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        }
    })

    return(
        <Container>
            <form className="login-form">
                <FormInput object={userInfo.email}/>
                <FormInput object={userInfo.password}/> 
                <SubmitButton value={"Log In"} onClick={handleSubmit}/>
                <SubmitButton value={"I forgot my password"} onClick={handleForgetRedirect}/>
            </form>
            
        </Container>
    )
}

export default LoginPage;