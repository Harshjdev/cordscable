import Header from "../../Components/Header/Header";
import Marquee from "../../Components/Marquee/Marquee";
import Breadcrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";
import CardSlider from "../../Components/CardSlider/CardSlider";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useCart } from "../../Context/CartContext";
import PriceBreakdownPopup from "../../Components/PriceBreakdownPopup/PriceBreakdownPopup";
import { useEffect, useState } from "react";
import {
    cordsCategory,
    mostUsedTags,
    getheadline,
    getSimilarProducts
} from "../../store/Services/AllApi";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import LoginModal from "../../Components/Login/LoginModal";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

const Cart = () => {
    const {
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        pendingCheckout,
    } = useContext(UserContext);
    const {
        cartItems,
        subtotal,
        gstAmount,
        shipping,
        totalBeforeDiscount,
        finalTotal,
        discount,
        setDiscount,
        promoCode,
        setPromoCode,
        error,
        setError,
        cartCount,
        updateQuantity,
        removeFromCart,
        setPendingCheckout
    } = useCart();
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [tagsData, setTagsData] = useState([]);
    const [breakdownVisibility, setBreakdownVisibility] = useState({});
    const [categoryData, setCategoryData] = useState([]);
    const [headline, setHeadline] = useState("");
    const [breadcrumbData, setBreadcrumbData] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expandedTitles, setExpandedTitles] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (user && pendingCheckout?.type === "cart") {
            setIsLoginModalOpen(false);
            setPendingCheckout(null); // ✅ clear after redirect
            navigate("/checkout");
        }
    }, [user, pendingCheckout, navigate]);


    useEffect(() => {
        const loggedIn = !!localStorage.getItem("user");
        setIsLoggedIn(loggedIn);
    }, []);


    const handleNavtoDetail = (product) => {
        navigate(`/product-details?product_id=${product.id}`);
    };

    const getShortTitle = (title) => {
        const words = title.split(" ");
        if (words.length <= 9) return title;
        return words.slice(0, 9).join(" ") + "...";
    };

    const handleCheckout = () => {
        if (!user) {
            setIsLoginModalOpen(true);
            setPendingCheckout({ type: "cart" });
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            return;
        }

        navigate("/checkout");
    };


    const handleApplyPromo = async () => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            const res = await fetch("https://cords.tranktechnologies.com/api/validate-coupon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: promoCode,
                    cart_total: totalBeforeDiscount,
                }),
            });
            const result = await res.json();

            if (result.status) {
                const discountAmount =
                    result.data.discount_type === "fixed"
                        ? result.data.discount_value
                        : (totalBeforeDiscount * result.data.discount_value) / 100;
                setDiscount(discountAmount);
                setError(null);
            } else {
                setDiscount(0);
                setError(result.message || "Invalid coupon.");
            }
        } catch (err) {
            setDiscount(0);
            setError("Something went wrong.");
        }
    };



    // Calculate prices
    const total = subtotal + gstAmount;
    const discountedTotal = total - discount;

    useEffect(() => {
        setDiscount(0);
        setPromoCode("");
        setError(null);
    }, [cartItems]);


    useEffect(() => {
        if (cartItems.length > 0) {
            const firstProductId = cartItems[0].id;
            getSimilarProducts({ product_id: firstProductId })
                .then((res) => {
                    const products = res?.data?.data || [];
                    console.log("sim", products);
                    setSimilarProducts(products);
                })
                .catch((err) => {
                    console.error("Error fetching similar products:", err);
                });
        }
    }, [cartItems]);


    useEffect(() => {
        cordsCategory({ body: {} }).then(setCategoryData).catch(err => console.error(err));
        getheadline({ body: {} }).then(setHeadline).catch(err => console.error(err));
        mostUsedTags({ body: {} }).then(setTagsData).catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Header tagsData={tagsData} categoryData={categoryData} />
            <Marquee headline={headline} />
            {breadcrumbData.length > 0 && <Breadcrumb breadcrumbData={breadcrumbData} />}

            <div className="cart-layout">
                <div className="cart-left">
                    <div className="cart-box">
                        <h2 className="cart-title">
                            My Cart {cartCount > 0 && <span>{cartCount}</span>}
                        </h2>

                        {cartItems.length > 0 ? cartItems.map((item, index) => {
                            const itemSubtotal = item.final_price * item.quantity;
                            const itemGst = itemSubtotal * 0.18;
                            const itemTotal = itemSubtotal + itemGst;

                            const isBreakdownVisible = breakdownVisibility[item.id] || false;
                            const isTitleExpanded = expandedTitles[item.id] || false;

                            const toggleBreakdown = () => {
                                setBreakdownVisibility((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
                            };

                            return (
                                <div className="cart-item" key={item.id + index}> {/* Improved key */}
                                    <img
                                        src={item.feature_image_url}
                                        alt={item.title}
                                        onClick={() => handleNavtoDetail(item)}
                                    />
                                    <div className="item-details">
                                        <div className="item-details-div">
                                            <div className="item-title-row">
                                                <h3>
                                                    {isTitleExpanded ? item.title : getShortTitle(item.title)}
                                                    {item.title.split(" ").length > 9 && (
                                                        <span
                                                            onClick={() => setExpandedTitles(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                                                            style={{ color: "#007bff", cursor: "pointer", marginLeft: "2px", fontSize: "14px", display: "inline-block" }}
                                                        >
                                                            {isTitleExpanded ? "Read less" : "Read more"}
                                                        </span>
                                                    )}
                                                </h3>
                                            </div>
                                            <AiOutlineInfoCircle
                                                style={{ marginLeft: "8px", cursor: "pointer", color: "#555", position: "absolute", right: "0px" }}
                                                size={18}
                                                onClick={toggleBreakdown}
                                            />
                                        </div>
                                        {/* --- NEW: Display Variant Info --- */}
                                        {item.selectedVariantInfo && (
                                            <div className="cart-item-variants">
                                                {Object.entries(item.selectedVariantInfo).map(([name, value]) => (
                                                    <p key={name} className="variant-detail">
                                                        <strong>{name}:</strong> {value}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {/* --- END NEW --- */}

                                        <div className="pricediv">
                                            <p className="original-price">{item.price}</p>
                                            <p className="item-price">₹ {item.final_price}</p>
                                            <span className="discount"> {item.discount}% Off</span>
                                        </div>

                                        {isBreakdownVisible && (
                                            <PriceBreakdownPopup
                                                subtotal={itemSubtotal}
                                                gstAmount={itemGst}
                                                total={itemTotal}
                                                onClose={() => setBreakdownVisibility(prev => ({ ...prev, [item.id]: false }))}
                                            />
                                        )}

                                        <div className="quantity-wrapper">
                                            <div className="qty-control">
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                            <button
                                                className="removecart-btn"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="empty-cart">
                                <h2 className="empty-title">Your Cart is Empty!</h2>
                                <p className="empty-message">Must add items on the cart before you proceed to check out.</p>
                                <button className="shop-btn" onClick={() => navigate("/")}>CONTINUE TO SHOP</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="cart-right">
                    <h3>Payment Summary</h3>
                    <p>Your cart contains {cartItems.length} {cartItems.length === 1 ? "product" : "products"}</p>
                    <div className="summary-prices" style={{ position: "relative" }}>
                        <div><span>Subtotal</span><span>₹ {subtotal.toFixed(2)}</span></div>
                        <div><span>GST</span><span>₹ {gstAmount.toFixed(2)}</span></div>
                        <div><span>Shipping</span><span>Free</span></div>
                        <div className="total" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Total</span>
                            <span style={{ display: "flex", alignItems: "center", gap: "6px", position: "relative" }}>
                                ₹ {discountedTotal.toFixed(2)}
                            </span>
                        </div>
                        {discount > 0 && (
                            <div style={{ fontSize: "0.85rem", color: "green", marginTop: "4px" }}>
                                Discount applied: - ₹{discount.toFixed(2)}
                            </div>
                        )}

                    </div>
                    <div className="promo-code">
                        <input
                            type="text"
                            placeholder="Enter Promo Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={handleApplyPromo}>Apply</button>
                    </div>
                    {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}

                    <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>

            {cartItems.length > 0 && similarProducts.length > 0 && (
                <>
                    <h1 className="similarhead">Similar Products</h1>
                    <CardSlider
                        items={similarProducts}
                        renderItem={(item) => <ProductCard product={item} setLoading={setLoading} />}
                    />
                </>
            )}
            {isLoginModalOpen && (
                <LoginModal
                    isModalOpen={isLoginModalOpen}
                    setIsModalOpen={setIsLoginModalOpen}
                />
            )}



            <Footer />
        </div>
    );
};

export default Cart;