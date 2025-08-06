import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [pendingCheckout, setPendingCheckout] = useState(null); // ✅ now can be object or null



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Listen for manual login updates via custom event
        const handleLogin = () => {
            const newUser = localStorage.getItem("user");
            if (newUser) {
                setUser(JSON.parse(newUser));
            }
        };

        window.addEventListener("user-logged-in", handleLogin);
        return () => window.removeEventListener("user-logged-in", handleLogin);
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            isLoginModalOpen,
            setIsLoginModalOpen,
            pendingCheckout,
            setPendingCheckout, // ✅ ensure it's provided
        }}>
            {children}
        </UserContext.Provider>
    );
};
