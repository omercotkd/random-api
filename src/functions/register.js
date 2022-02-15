const sendRegisterInfo = (user) => {
    return fetch("/api/register", { method: "POST", body: JSON.stringify(user)})
    .then(res => {
        if (res.status === 201){
            alert("Account created. Please confirm your account via a link sent to your email.");
            return true;
        }else if(res.status === 303){
            alert("User already exists");
            return res.status;
        }else{
            alert("Unknown error try again.");
            return false;
        }
    });

    
};

export default sendRegisterInfo;