import React, { useState } from "react";
import { Container } from "react-bootstrap";

import FormInput from "../form-input/form-input.component";
import SubmitButton from "../button/submitButton.component";

import changePassword from "../../functions/changePassword";
import passwordValditor from "../../functions/passwordValditon";
import { useNavigate } from "react-router-dom";

const ChangePasswordForm = (props) => {
    const navigate = useNavigate()  
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setNewPassword(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...newPassword[name],
                    value: value,
                    
                }
            }
        ));
    };
    
    const handleSubmit = (event) =>{
        event.preventDefault();

        if (!(props.userState)){
            alert("You need to log in to change your password")
            navigate("/login")
            return false;
        }

        // checks if there are any empty fields
        let fieldAmpty = false;
        for(const item in newPassword){
            if(newPassword[item].value === ""){
                fieldAmpty = true
            };
        };

        if(fieldAmpty){
            alert("There are empty fields! , all fields must be field")
            return false;
        };

        if(newPassword.password.value != newPassword.confirmPassword.value){
            alert("Passwords don't match");
            return false;
        };

        // checks if the new password is a valid one
        if(!passwordValditor(newPassword.password.value)){
            return false;
        };
        
        changePassword(newPassword.password.value)
        .then(navigate("/"))

    };

    const [newPassword, setNewPassword] = useState({        
        password: {
            name: "password",
            placeholder: "New Password",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        },
        confirmPassword: {
            name: "confirmPassword",
            placeholder: "Confirm New Password",
            onChange: handleChange,
            value: "",
            fieldType: "password"
        }
    });

    return(
        <Container>
            <FormInput object={newPassword.password}/>
            <FormInput object={newPassword.confirmPassword}/>
            <SubmitButton value={"Change Password"} onClick={handleSubmit}/>
        </Container>
    );
};

export default ChangePasswordForm;