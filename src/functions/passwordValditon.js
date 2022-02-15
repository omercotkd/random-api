const passwordValditor = (password) => {
    const numbers = /[0-9]/g;
    const letters = /[a-zA-Z]/g;
    // i am seting the mex length of a password to 32 chars so no one can send alot of chars
    if(password.length < 8 || password.length > 32){
        alert("Passwords must be between 8 to 32 characters.");
        return false;
    }else if(! password.match(numbers)){
        alert("Passwords must contain letters and numbers.");
        return false;
    }else if(! password.match(letters)){
        alert("Passwords must contain letters and numbers.");
        return false;
    };
    
    return true;
};

export default passwordValditor;