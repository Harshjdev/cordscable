import React, { useState } from "react";
import "./LoginModal.css";
import LoginForm from "../LoginFrom/Loginform";
import RegisterForm from "../RegisterForm/RegisterForm";

const LoginModal = ({ onClose }) => {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="login-overlay">
            <div className="login-box">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                {isRegistering ? (
                    <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
                ) : (
                    <LoginForm
                        onSwitchToRegister={() => setIsRegistering(true)}
                        onLoginSuccess={onClose}
                    />

                )}
            </div>
        </div>
    );
};

export default LoginModal;
