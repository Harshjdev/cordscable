import "./Header.css";
import { FaLink } from "react-icons/fa6";
import { FaSearch, FaHome, FaThLarge, FaTags, FaTicketAlt } from "react-icons/fa";
import linkedin from "../../assets/LinkedIn.svg";
import twitter from "../../assets/Twitter.svg";
import logo from '../../assets/StockYard-logo.svg';
import cart from '../../assets/cart-icon.svg';
import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchPopup from "../SearchPopup/SearchPopup";
import LoginModal from "../Login/LoginModal";
import { useCart } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import { IoMdHome } from "react-icons/io";
import { useSearchParams } from "react-router-dom";


const Header = ({ categoryData, tagsData }) => {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";
    const { cartCount } = useCart();
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleSearchFocus = () => setShowPopup(true);

    const handleClickOutside = (e) => {
        if (!e.target.closest(".search-wrapper")) {
            setShowPopup(false);
        }
    };

    const handleLogoClick = () => navigate('/');
    const handlenavigate = () => navigate("/cart");
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const toggleLoginPopup = () => setShowLoginPopup(true);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div>
            <div className="top-bar">
                <div className="container">
                    <div className="flex space-between align-center">
                        <div className="phoneinfo">
                            <a href="tel:00911140551200" className="phone-link">
                                <FaLink />
                                <span>+91-9958688484</span>
                            </a>
                        </div>

                        <div className="socialinfo">
                            <div className="topbar-menu">
                                <ul>
                                    <li><a href="/bulk-order">Track Order</a></li>
                                    <li>
                                        {user?.full_name ? (
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <span onClick={() => navigate("/dashboard")} style={{ fontWeight: "bold", color: "#007bff" }}>
                                                    Hi, {user.full_name.split(" ")[0]}
                                                </span>
                                                <span
                                                    onClick={() => navigate("/dashboard")}
                                                    style={{ cursor: "pointer", color: "#007bff", fontWeight: "500", fontSize: "22px" }}
                                                >
                                                    <IoMdHome />
                                                </span>
                                            </div>
                                        ) : (
                                            <span onClick={toggleLoginPopup} style={{ cursor: "pointer" }}>
                                                My Account - Login
                                            </span>
                                        )}
                                    </li>

                                    <li>
                                        <a href="#"><img src={linkedin} alt="LinkedIn" /></a>
                                    </li>
                                    <li>
                                        <a href="#"><img src={twitter} alt="Twitter" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header className="main-header">
                <div className="container">
                    <div className="header_top flex align-center space-between">
                        <div className="logodiv">
                            <div className="logo" onClick={handleLogoClick}>
                                <img src={logo} alt="StockYard Logo" />
                            </div>
                        </div>

                        <div className="header-right flex align-center">
                            <div className="toggle" onClick={toggleSidebar}>
                                <span></span><span></span><span></span>
                            </div>

                            <div className="search-wrapper" style={{ position: "relative" }}>
                                <form
                                    action="/search"
                                    className="searchfrom"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const query = e.target.elements.searchInput.value.trim();
                                        if (query) {
                                            const prevSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
                                            const updatedSearches = [query, ...prevSearches.filter(q => q !== query)].slice(0, 5);
                                            localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
                                            navigate(`/product?search=${encodeURIComponent(query)}`);
                                        }
                                    }}
                                >
                                    <div className="search-input-wrapper">
                                        <div className="searchinput">
                                            <input
                                                id="filter_users"
                                                name="searchInput"
                                                type="text"
                                                placeholder="Search for products..."
                                                onFocus={handleSearchFocus}
                                                defaultValue={searchQuery}
                                            />
                                        </div>
                                        <div className="searchbtn">
                                            <button type="submit" className="search-button">
                                                <FaSearch />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                {showPopup && <SearchPopup tagsData={tagsData} categoryData={categoryData} />}
                            </div>

                            <nav className="menu">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><a href="https://cablecommunity.com/" target="_blank" rel="noopener noreferrer">Community</a></li>
                                    <li><Link to="/career">Career</Link></li>
                                </ul>
                            </nav>

                            <div className="cart" onClick={handlenavigate}>
                                <div className="cart-icon-wrapper">
                                    <img src={cart} alt="Cart" />
                                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                                </div>
                                <span className="cart-text">Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

            <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-header">
                    <img src={logo} alt="StockYard Logo" className="sidebar-logo" />
                </div>
                <ul className="sidebar-menu">
                    <li><FaHome className="sidebar-icon" /><a href="/">Home</a></li>
                    <li onClick={() => navigate("/product?per_page=12")}><FaThLarge className="sidebar-icon" /><span>All Categories</span></li>
                    <li><FaTags className="sidebar-icon" /><a href="/brands">Explore All Brands</a></li>
                    <li><FaTicketAlt className="sidebar-icon" /><a href="/coupons">Coupon Store</a></li>
                </ul>
            </div>

            {showLoginPopup &&
                <LoginModal
                    onClose={() => setShowLoginPopup(false)}
                    onLoginSuccess={(user) => {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);
                    }}
                />}
        </div>
    );
};

export default Header;
