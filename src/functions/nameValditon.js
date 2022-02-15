const nameValiditor = (name) => {
    const letters = /^[a-zA-Z\s]+$/;
    if (!letters.test(name)){
        alert("Name must contain only English letters.");
        return true;
    }
    return false;

};
export default nameValiditor