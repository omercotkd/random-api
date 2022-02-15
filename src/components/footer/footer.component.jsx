import React from "react";
import "./footer.styles.css";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return(
        <footer>
            <p>&copy; Copyright {currentYear}, Omer Cohen</p>
        </footer>
    )


};
export default Footer;