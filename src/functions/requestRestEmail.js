const getEmailReset = (email) => {
    
    const data = new Object({
        email: email
    })    
    return (
        fetch("/api/request-password-reset", { method: "POST", body: JSON.stringify(data)})
        .then(res => {
            if (res.status === 201){
                alert("The email has been sent");
                return true;
            }else if(res.status === 401){
                alert("Invalid email please check it and try again.");
                return false;
            }
        })
    )
};

export default getEmailReset;