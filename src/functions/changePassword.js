const changePassword = (password) => {
    const data = new Object({
        password: password
    })
    return (
        fetch("/api/change-password", { method: "POST", body: JSON.stringify(data)})
        .then(res => {
            if (res.status === 201){
                alert("password changed");
                return true;
            }else if(res.status === 401){
                alert("You need to log in to change your password");
                return false;
            }
        })
    )

};

export default changePassword;