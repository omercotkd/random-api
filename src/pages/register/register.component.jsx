import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import emailValidation from "../../functions/emailValditon";
import passwordValditor from "../../functions/passwordValditon";
import nameValiditor from "../../functions/nameValditon";
import sendRegisterInfo from "../../functions/register";

import FormInput from "../../components/form-input/form-input.component";
import SubmitButton from "../../components/button/submitButton.component";
import "./register.style.css"

const RegisterPage = (props) => {

    const navigate = useNavigate();

    if (props.userState){
        navigate("/");
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormData(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...formData[name],
                    value: value,
                    
                }
            }
        ));
    };

    const handleSubmit = (event) => {
        
        event.preventDefault();
        // checks if there r any empty fields
        let fieldAmpty = false;
        for(const item in formData){
            if(formData[item].value === ""){
                fieldAmpty = true
            };
        };

        if(fieldAmpty){
            alert("There are empty fields! , all fields must be field")
            return false;
        };

        // test if the name is only in english letters
        if(nameValiditor(formData.firstName.value)){
            return false;
        };

        // checks if the email and password match the confirm fields
        if(formData.email.value != formData.confirmEmail.value ){
            alert("Emails don't match");
            return false;
        }else if(formData.password.value != formData.confirmPassword.value){
            alert("Passwords don't match");
            return false;
        };

        // checks if the email and passwords are valids i think its batter to call this after the "check if match" beacuse its more demnding
        if (!emailValidation(formData.email.value)){
            return false;
        }else if(!passwordValditor(formData.password.value)){
            return false;
        };

        const newUser = new Object({
            name: formData.firstName.value,
            email: formData.email.value,
            password: formData.password.value
        });

        sendRegisterInfo(newUser)
        .then(res => {
            if( res === 303){
                //redirect to login page
            }else if(res){
                props.setUserState(true);
                //redirect to userInfo page (need to crate)
            }else{
                //do nothing
            };
        });

    };

    const [formData, setFormData] = useState({
        email: {
            name: "email",
            placeholder: "Email",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        confirmEmail: {
            name: "confirmEmail",
            placeholder: "Confirm email",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        firstName: {
            name: "firstName",
            placeholder: "Name",
            onChange: handleChange,
            value: "",
            fieldType: "text"
        },
        password: {
            name: "password",
            placeholder: "Password",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        },
        confirmPassword: {
            name: "confirmPassword",
            placeholder: "Confirm password",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        }
    });



    return(
        
    <Container>
        <form className="register-form">
            <FormInput object={formData.firstName}/>
            <FormInput object={formData.email}/>
            <FormInput object={formData.confirmEmail}/>
            <FormInput object={formData.password}/>
            <FormInput object={formData.confirmPassword}/>
            <SubmitButton value={"crate account"} onClick={handleSubmit}/>
        </form>
    </Container>
        
    )
}

export default RegisterPage;