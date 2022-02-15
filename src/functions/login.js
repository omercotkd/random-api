const logInUser = (user) => {
    return fetch("/api/login", { method: "POST", body: JSON.stringify(user)})
        .then(res => {
            if (res.status === 201){
            return true;
            }else if(res.status === 401){
                alert("Check email and password and try again.");
                return false;
            }else{
                alert("Unknown error try again.");
                return false;
            };
        });
};

export default logInUser;   