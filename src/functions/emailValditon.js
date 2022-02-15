const emailValidation = (email) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
    }else{
        alert("Sorry, an invalid email!");
        return false
    }
};

export default emailValidation;