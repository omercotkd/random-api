import React from "react";

import "./form-input.style.css";

const FormInput = (props) => {
    

    return (
        
            <input 
                className="form-input"
                value={props.object.value}
                name={props.object.name}
                placeholder={props.object.placeholder}
                onChange={props.object.onChange}
                type={props.object.fieldType}
                required           
            />
        
    )

};

export default FormInput