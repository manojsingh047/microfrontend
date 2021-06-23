import React from "react";
import LoginButton from "../login-button/LoginButton";

const Logout = () => {
    return (
        <div>
            <h2>You've been logged out!</h2>
            <p>Click here to login again: <LoginButton /></p>
        </div>
    );
};

export default Logout;