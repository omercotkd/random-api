const checkLoggedIn = () => {
    return (
        fetch("/api/userLogedIn", { method: "POST"})
        .then(res => {
            if (res.status === 304){
                return true;
            }else{
                return false;
            }
        })
    )

};

export default checkLoggedIn;