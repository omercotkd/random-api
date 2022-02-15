import React, { useState } from "react";
import ChangePasswordForm from "../../components/changePassword/changePassword.component";


const ChangePasswordPage = (props) => {
    


    return(
        <ChangePasswordForm userState={props.userState}/>
    );

    };

export default ChangePasswordPage;