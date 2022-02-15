import React from "react";
import { Button } from "react-bootstrap";

import "./submitButton.style.css";

const SubmitButton = (props) => {


    return(     
        <Button variant="primary" size="lg" onClick={props.onClick} className="btn-pad">{props.value}</Button>   
    )

};

export default SubmitButton;