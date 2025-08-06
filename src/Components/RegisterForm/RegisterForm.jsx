import { useState } from "react";

const RegisterForm = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        pan_card: "",
        phone_no: "",
        password: "",
        confirmPass: "",
    });

    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPass) {
            setFieldErrors({ confirmPass: ["Passwords do not match"] });
            return;
        }

        try {
            const res = await fetch("https://cords.tranktechnologies.com/api/customer-register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Register-Key": "super-secret-register-key",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Registration successful!");
                setFieldErrors({});
                onSwitchToLogin();
            } else {
                if (data.errors) {
                    setFieldErrors(data.errors);
                } else {
                    setFieldErrors({ general: [data.message || "Registration failed."] });
                }
            }
        } catch (error) {
            console.error("Registration error:", error);
            setFieldErrors({ general: ["Something went wrong. Please try again."] });
        }
    };

    const errorStyle = { color: "red", fontSize: "14px" };

    return (
        <>
            <h2 className="login-title">Register</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {fieldErrors.general && (
                    <div style={errorStyle}>{fieldErrors.general[0]}</div>
                )}

                <input type="text" name="fname" placeholder="First Name" className="login-input" required onChange={handleChange} />
                {fieldErrors.fname && <div style={errorStyle}>{fieldErrors.fname[0]}</div>}

                <input type="text" name="lname" placeholder="Last Name" className="login-input" required onChange={handleChange} />
                {fieldErrors.lname && <div style={errorStyle}>{fieldErrors.lname[0]}</div>}

                <input type="email" name="email" placeholder="Email" className="login-input" required onChange={handleChange} />
                {fieldErrors.email && <div style={errorStyle}>{fieldErrors.email[0]}</div>}

                <input type="text" name="pan_card" placeholder="PAN Card" className="login-input" required onChange={handleChange} />
                {fieldErrors.pan_card && <div style={errorStyle}>{fieldErrors.pan_card[0]}</div>}

                <input type="text" name="phone_no" placeholder="Phone Number" className="login-input" required onChange={handleChange} />
                {fieldErrors.phone_no && <div style={errorStyle}>{fieldErrors.phone_no[0]}</div>}

                <input type="password" name="password" placeholder="Password" className="login-input" required onChange={handleChange} />
                {fieldErrors.password && <div style={errorStyle}>{fieldErrors.password[0]}</div>}

                <input type="password" name="confirmPass" placeholder="Confirm Password" className="login-input" required onChange={handleChange} />
                {fieldErrors.confirmPass && <div style={errorStyle}>{fieldErrors.confirmPass[0]}</div>}

                <button type="submit" className="login-button">Register</button>
            </form>

            <p className="register-text">
                Already have an account?{" "}
                <a href="#" onClick={onSwitchToLogin}>Login</a>
            </p>
        </>
    );
};

export default RegisterForm;
