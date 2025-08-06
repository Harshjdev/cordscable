import Marquee from "../../Components/Marquee/Marquee";
import { getheadline } from "../../store/Services/AllApi";
import { useEffect, useState } from "react";
import { cordsCategory } from "../../store/Services/AllApi";
import { mostUsedTags } from "../../store/Services/AllApi";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Dashboard.css"
import { GoHomeFill } from "react-icons/go";
import { FaBox } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../../Components/UserProfile/Userprofile";
import MyOrders from "../../Components/MyOrders/MyOrders";
import AddressForm from "../../Components/AddressForm/AddressForm";
import { NavLink, Outlet } from "react-router-dom";





const Dashboard = () => {
    const navigate = useNavigate(); // ✅ must be inside the component
    const { user, setUser } = useContext(UserContext);
    const [headline, setHeadline] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [tagsData, setTagsData] = useState([]);
    const { cartCount } = useCart();


    useEffect(() => {
        getheadline({ body: {} })
            .then((headlineres) => {
                console.log("headline", headlineres)
                setHeadline(headlineres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        cordsCategory({ body: {} })
            .then((response) => {
                // console.log("cords category", response);
                setCategoryData(response)
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
        mostUsedTags({ body: {} })
            .then((tagsres) => {
                console.log("tags", tagsres);
                setTagsData(tagsres);
            })
            .catch((error) => {
                console.error("Error fetching cruise categories:", error);
            });
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("user-logged-out"));
        setUser(null);
        navigate('/');
        toast.success("User Logged Out");
    };
    return (
        <div>
            <Header categoryData={categoryData} tagsData={tagsData} />
            <Marquee headline={headline} />
            <div className="dashboard-container">
                <aside className="usersidebar">
                    <div className="profile-section">
                        <img
                            src="https://via.placeholder.com/60"
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="profile-name">
                            <div>{user?.full_name || "Guest"}</div>
                        </div>
                    </div>
                    <nav className="nav-links">
                        <NavLink to="/dashboard" end><GoHomeFill className="dashicon" /> Dashboard</NavLink>
                        <NavLink to="/dashboard/profile"><FaUser className="dashicon" /> My Profile</NavLink>
                        <NavLink to="/dashboard/orders"><FaBox className="dashicon" /> Order</NavLink>
                        <NavLink to="/dashboard/address"><FaMapMarkerAlt className="dashicon" /> Address</NavLink>
                        <button onClick={handleLogout}><FaArrowRightToBracket className="dashicon" /> Logout</button>
                    </nav>

                </aside>

                <main className="dashboard-content">
                    <Outlet />
                </main>

            </div>
            <Footer />
        </div>
    )
}

export default Dashboard