const logOutUser = () => {
    return fetch("/api/logout", { method: "POST"})
    .then(res => {
        if(res.status === 200){
            alert("Successfully logged out.");
            return true;
        }else{
            alert("An error accord try again");
            return false;
        };
    });
};

export default logOutUser;