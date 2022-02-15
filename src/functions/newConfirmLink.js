const newConfirmLink = () => {
    fetch("/api/new-confiramtion-mail", { method: "POST"})
    .then(res => {
        if (res.status === 201){

            alert("A new email has been sent.")

        }else if(res.status === 304){
            
            alert("Account has already been confirmed.")

        }else{
            
            alert("Unknown error try again.");
        };
    });
};

export default newConfirmLink;