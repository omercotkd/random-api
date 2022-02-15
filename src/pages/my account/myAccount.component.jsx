import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import getInfo from "../../functions/gerAccountInfo";
import newConfirmLink from "../../functions/newConfirmLink";
import UserInfoBox from "../../components/userInfo/userInfo.component";
import ChangePasswordForm from "../../components/changePassword/changePassword.component";
import { Button, Container } from "react-bootstrap";
import "./myAccount.style.css";

const MyAccount = (props) => {
    
    const navigate = useNavigate();
    
    const [accountInfo, setAccountInfo] = useState(false);

    // get the account info from the api and set the "accountInfo"
    useEffect(() => {
        if (!(props.userState)){
            navigate("/login");
            return;
        }else{
            getInfo().
            then(data => {
                if (data){
                    setAccountInfo({
                        name: data.name,
                        email: data.email,
                        key: data.key
                    });
                }
            });      
        };
    }, []);

    const handleNewConfirmClick = () =>{
        newConfirmLink();
    };
        


    return(  
        <Container className="my-account-div">
            <h1>Hi {accountInfo.name}</h1>           
            <UserInfoBox text={accountInfo.email} title="email provided"/>
            {
                accountInfo.key === "You need to confirm your email to get one" &&
                <Button onClick={handleNewConfirmClick}>Confirm your email</Button>
            }
            <UserInfoBox text={accountInfo.key} title="api key"/> 
            <h3>Change Password:</h3>
            <ChangePasswordForm userState={props.userState}/>
         
        </Container> 
    );
};

export default MyAccount;