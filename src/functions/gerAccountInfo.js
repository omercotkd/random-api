const getInfo = () => {
    return fetch("/api/account-info",  { method: "POST"})
        .then(res => {
            if (!(res.status > 390)){
                return res.json()
            }else{
                return false;
            }
        });
};

export default getInfo;