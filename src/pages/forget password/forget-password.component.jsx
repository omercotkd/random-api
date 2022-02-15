import {React, useState} from "react";
import { Container } from "react-bootstrap";
import FormInput from "../../components/form-input/form-input.component";
import SubmitButton from "../../components/button/submitButton.component";
import emailValidation from "../../functions/emailValditon";
import { useNavigate } from "react-router-dom";
import getEmailReset from "../../functions/requestRestEmail";

const ForegtPasswordPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        
        // checks for empty fields
        let fieldAmpty = false;
        for(const item in userEmail){
            if(userEmail[item].value === ""){
                fieldAmpty = true
            };
        };
        if(fieldAmpty){
            alert("There are empty fields! , all fields must be field")
            return false;
        };
        
        // checks if the fields match
        if(userEmail.email.value != userEmail.confirmEmail.value){
            alert("Emails don't match");
            return false;
        };

        // checks if the email is a valid one
        if (!emailValidation(userEmail.email.value)){
            return false;
        };
        
        getEmailReset(userEmail.email.value)
        .then(res => {
            if(res){
                navigate("/")
            }
        })

    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setUserEmail(prevVelues => (
            {
                ...prevVelues,
                [name]: {
                    ...userEmail[name],
                    value: value,
   
                }
            }
        ));
    };

    const [userEmail, setUserEmail] = useState({        
        email: {
            name: "email",
            placeholder: "Email",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        },
        confirmEmail: {
            name: "confirmEmail",
            placeholder: "Confirm Email",
            onChange: handleChange,
            value: "",
            fieldType: "email"
        }
    });

    return(
        <Container>
            <FormInput object={userEmail.email}/>
            <FormInput object={userEmail.confirmEmail}/>
            <SubmitButton value={"Send password reset email"} onClick={handleSubmit}/>
        </Container>
    );

};
export default ForegtPasswordPage;