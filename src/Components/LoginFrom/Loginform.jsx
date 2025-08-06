import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { loginCustomer } from "../../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const LoginForm = ({ onSwitchToRegister, onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { setUser, pendingCheckout, setPendingCheckout } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginResponse = await loginCustomer({ email, password });

            if (loginResponse.status) {
                const user = loginResponse.user;
                const token = user.token;
                const serverCart = loginResponse.cart_data || [];

                if (!user || !token) {
                    toast.error("Missing user or token in the response.");
                    setLoading(false);
                    return;
                }

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                window.dispatchEvent(new Event("user-logged-in"));
                window.dispatchEvent(new Event("cartChanged")); // 👈
                toast.success("Login successful!");

                try {
                    const localCartDataString = localStorage.getItem("cart");
                    const localCart = localCartDataString ? JSON.parse(localCartDataString) : [];

                    const mergedCart = [];

                    const addToMergedCart = (item) => {
                        const existing = mergedCart.find(
                            (i) => i.id === item.id && i.vendor_id === item.vendor_id
                        );

                        if (existing) {
                            existing.quantity += item.quantity;
                            existing.final_price = Math.max(existing.final_price, item.final_price || item.price);
                        } else {
                            mergedCart.push({ ...item });
                        }
                    };

                    serverCart.forEach(addToMergedCart);
                    localCart.forEach(addToMergedCart);

                    const transformedCartData = mergedCart.map(item => ({
                        ...item,
                        id: parseInt(item.id, 10),
                        final_price: parseFloat(item.final_price || item.price),
                        price: parseFloat(item.price),
                        discount: String(item.discount || "0"),
                        vendor_id: parseInt(item.vendor_id, 10),
                        quantity: parseInt(item.quantity, 10)
                    }));

                    const cartPayload = {
                        user_id: user.user_id,
                        cart_data: transformedCartData
                    };

                    const saveCartResponse = await fetch("https://cords.tranktechnologies.com/api/save-cart", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(cartPayload),
                    });

                    if (!saveCartResponse.ok) {
                        const errorData = await saveCartResponse.json();
                        throw new Error(errorData.message || "Cart sync failed.");
                    }

                    localStorage.setItem("cart", JSON.stringify(transformedCartData));
                    window.dispatchEvent(new Event("cart-updated"));

                } catch (cartError) {
                    console.error("Cart sync error:", cartError);
                    toast.error(cartError.message || "Could not sync your cart.");
                }

                if (pendingCheckout?.type === "buyNow") {
                    navigate("/checkout", { state: { buyNowProduct: pendingCheckout.product } });
                } else if (pendingCheckout?.type === "cart") {
                    navigate("/checkout");
                }

                setPendingCheckout(null);
                if (onLoginSuccess) onLoginSuccess(user);

            } else {
                toast.error(loginResponse.message || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="login-wrapper">
            <h2 className="login-title">Login</h2>

            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="login-options">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="#" className="forgot-link">
                        Forgot Password?
                    </a>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="register-text">
                Don’t have an account?{" "}
                <a href="#" onClick={onSwitchToRegister}>
                    Register
                </a>
            </p>
        </div>
    );
};

export default LoginForm;