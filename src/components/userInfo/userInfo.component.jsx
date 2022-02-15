import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./userInfo.style.css";

const UserInfoBox = (props) => {

    const [visible, setVisibility] = useState(true);

    const onClickHandler = () => {
        setVisibility(!visible);
    };
    
    

    return(
        <div>
            <h3 className="text-title">{props.title}:</h3>
            <p className={`text-class ${visible && "blur-text"}`}>{props.text}</p>
            <Button onClick={onClickHandler}>{visible ? "show" : "hide"} me</Button>
        </div>
    );
};

export default UserInfoBox;