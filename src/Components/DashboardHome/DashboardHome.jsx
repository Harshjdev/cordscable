import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const DashboardHome = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <h2>Welcome to {user?.full_name || "Dashboard"}</h2>
            <p>
                From your account dashboard you can view your recent orders, manage
                your shipping and billing addresses, and edit your password and
                account details.
            </p>

            <div className="order-stats">
                <div className="stat-box"><h3>23</h3><p>Orders</p></div>
                <div className="stat-box"><h3>0</h3><p>Completed</p></div>
                <div className="stat-box"><h3>0</h3><p>Pending</p></div>
                <div className="stat-box"><h3>0</h3><p>Cancelled</p></div>
            </div>
        </>
    );
};

export default DashboardHome;
