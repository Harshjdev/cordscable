import "./Checkout.css";
import logo from '../../assets/StockYard-logo.svg';
import { useCart } from "../../Context/CartContext";
import { useState, useMemo, useEffect } from "react";
import AddressModal from "../../Components/AddressModal/AddressModal";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserAddress, editUserAddress } from "../../store/Services/AllApi";
import { FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";



const Checkout = () => {
    const { cartItems, subtotal, gstAmount, shipping, discount, finalTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [addressList, setAddressList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [expandedTitles, setExpandedTitles] = useState({});
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedAddressData, setSelectedAddressData] = useState(null);

    const buyNowProduct = location.state?.buyNowProduct || null;
    const isBuyNow = !!buyNowProduct;

    const toggleTitle = (index) => {
        setExpandedTitles((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // Either cartItems or buyNowProduct (only one shown)
    const productsToRender = isBuyNow ? [buyNowProduct] : cartItems;

    // If "Buy Now", calculate everything separately
    const buyNowSubtotal = useMemo(() => {
        return buyNowProduct ? buyNowProduct.final_price * buyNowProduct.quantity : 0;
    }, [buyNowProduct]);

    const buyNowGst = useMemo(() => buyNowSubtotal * 0.18, [buyNowSubtotal]);

    const buyNowTotal = useMemo(() => buyNowSubtotal + buyNowGst, [buyNowSubtotal, buyNowGst]);

    const buyNowDiscountedTotal = useMemo(() => buyNowTotal - discount, [buyNowTotal, discount]);

    const getShortTitle = (title) => {
        const words = title.split(" ");
        return words.length <= 9 ? title : words.slice(0, 9).join(" ") + "...";
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleUseAddress = (addressItem) => {
        setSelectedAddressId(addressItem.id);
        setSelectedAddressData(addressItem);
        console.log("Selected Address:", addressItem);
    };



    // Re-fetch addresses whenever the modal is closed to ensure the list is up-to-date
    useEffect(() => {
        if (showModal) return; // Don't refetch while modal is open

        const userData = localStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;
        const user_id = user?.user_id;

        if (user_id) {
            setLoading(true); // Set loading state for refetch
            getUserAddress({ user_id })
                .then((res) => {
                    const addresses = res?.data?.addresses || [];
                    setAddressList(addresses);
                    console.log("Refetched addresses:", addresses);
                })
                .catch((err) => {
                    console.error("Failed to fetch addresses", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            console.warn("No user_id found in localStorage");
            setLoading(false);
        }
    }, [showModal]);




    return (
        <div className="checkout-wrapper">
            {showModal && (
                <AddressModal
                    onClose={() => setShowModal(false)}
                    selectedAddress={selectedAddress}
                />
            )}
            <header className="checkout-header">
                <div className="logo" onClick={handleLogoClick}>
                    <img src={logo} alt="Stockyard Logo" />
                </div>
            </header>

            <div className="checkout-container">
                <div className="checkout-left">
                    {/* Progress Steps */}
                    <div className="step-progress">
                        <div className="step-labels">
                            <span className="step-text active">Address</span>
                            <span className="step-text">Payment</span>
                        </div>
                        <div className="progress-line">
                            <div className="line-fill"></div>
                            <div className="step-circle"></div>
                        </div>
                    </div>
                    {/* Saved Address */}
                    <div className="card-box">
                        <div className="card-title">Saved Address</div>
                        <div className="address-list">
                            {loading ? (
                                <p>Loading addresses...</p>
                            ) : addressList.length > 0 ? (
                                addressList.map((item) => {
                                    const billing = item.address?.billing_address;
                                    const isSelected = selectedAddressId === item.id;

                                    return (
                                        <div className={`address-item ${isSelected ? "selected" : ""}`} key={item.id}>
                                            <label className="radio-label">
                                                <input
                                                    type="radio"
                                                    name="selectedAddress"
                                                    value={item.id}
                                                    checked={isSelected}
                                                    onChange={() => handleUseAddress(item)}
                                                />
                                                <span>
                                                    {billing?.fname} {billing?.lname}, {billing?.address1}, {billing?.address2},
                                                    {billing?.landmark}, {billing?.city}, {billing?.state} - {billing?.pin}, {billing?.country}<br />
                                                    <FaPhone className="phoneicon" /> {billing?.phone} | <IoMdMail className="mailicon" /> {billing?.email}
                                                </span>
                                            </label>

                                            <span
                                                className="edit-icon"
                                                onClick={async () => {
                                                    try {
                                                        const userData = localStorage.getItem("user");
                                                        const user = userData ? JSON.parse(userData) : null;
                                                        const user_id = user?.user_id;

                                                        if (!user_id) {
                                                            console.error("User ID not found in localStorage");
                                                            return;
                                                        }

                                                        const res = await editUserAddress({
                                                            user_id,
                                                            address_id: item.id,
                                                        });

                                                        if (res?.status) {
                                                            setSelectedAddress(res.data.address);
                                                            setShowModal(true);
                                                        } else {
                                                            console.error("Edit API error:", res.message);
                                                        }
                                                    } catch (error) {
                                                        console.error("Edit API exception:", error);
                                                    }
                                                }}
                                            >
                                                ✎
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No saved addresses found.</p>
                            )}

                            {/* Add New Address */}
                            <div
                                className="add-address"
                                onClick={() => {
                                    setSelectedAddress(null);
                                    setShowModal(true);
                                }}
                            >
                                + Add Address
                            </div>
                        </div>
                    </div>

                    {selectedAddressData && (
                        <div className="card-box selected-address-box">
                            <div className="card-title">Delivery Address</div>
                            <div className="address-item selected">
                                <span>
                                    {selectedAddressData.address?.billing_address?.fname} {selectedAddressData.address?.billing_address?.lname}, {selectedAddressData.address?.billing_address?.address1}, {selectedAddressData.address?.billing_address?.address2}
                                    {selectedAddressData.address?.billing_address?.landmark}, {selectedAddressData.address?.billing_address?.city}, {selectedAddressData.address?.billing_address?.state} - {selectedAddressData.address?.billing_address?.pin}, {selectedAddressData.address?.billing_address?.country}<br />
                                </span>
                            </div>
                            <span className="phonemaildiv"><FaPhone className="phoneicon" /> {selectedAddressData.address?.billing_address?.phone}<IoMdMail className="mailicon" />{selectedAddressData.address?.billing_address?.email}</span>
                        </div>
                    )}




                    {/* Order Summary */}
                    <div className="card-box">
                        <div className="card-title">Order Summary</div>
                        {productsToRender.length > 0 ? (
                            <div className="checkout-products">
                                {productsToRender.map((item, index) => {
                                    const fullTitle = item.title;
                                    const shortTitle = getShortTitle(item.title);
                                    const isExpanded = expandedTitles[index];

                                    return (
                                        <div className="checkout-product-item" key={index}>
                                            <img
                                                src={item.feature_image_url}
                                                alt={item.title}
                                                className="checkout-product-img"
                                            />
                                            <div className="checkout-product-details">
                                                <div className="checkout-product-title">
                                                    {isExpanded ? fullTitle : shortTitle}
                                                    {fullTitle.split(" ").length > 9 && (
                                                        <span
                                                            className="read-more"
                                                            onClick={() => toggleTitle(index)}
                                                        >
                                                            {isExpanded ? " Show less" : " Read more"}
                                                        </span>
                                                    )}
                                                </div>

                                                {item.selectedVariantInfo && (
                                                    <div className="checkout-item-variants">
                                                        {Object.entries(item.selectedVariantInfo).map(([name, value]) => (
                                                            <p key={name} className="variant-detail">
                                                                <strong>{name}:</strong> {value}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="checkout-price-info">
                                                    <span className="original-price">₹{item.price}</span>
                                                    <span className="final-price">₹{item.final_price}</span>
                                                    <span className="checkout-discount">{item.discount}% Off</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p>No items in cart.</p>
                        )}
                    </div>

                    {/* Payment Method */}
                    <div className="card-box">
                        <div className="card-title">Payment Details</div>
                        <div className="payment-options">
                            <label><input type="radio" name="payment" /> UPI</label>
                            <label><input type="radio" name="payment" /> Wallets</label>
                            <label><input type="radio" name="payment" /> Debit / Credit Card</label>
                            <label><input type="radio" name="payment" /> Net Banking</label>
                            <label><input type="radio" name="payment" /> Cash on Delivery</label>
                        </div>
                    </div>
                </div>

                {/* Payment Summary Right */}
                <div className="checkout-right">
                    <div className="payment-summary">
                        <h3>Payment Summary</h3>
                        <p className="products-note">
                            Your shopping cart contains {productsToRender.length} {productsToRender.length === 1 ? "product" : "products"}
                        </p>

                        {/* Summary Rows */}
                        <div className="summary-row">
                            <span>Subtotal Amount</span>
                            <span>₹ {isBuyNow ? buyNowSubtotal.toFixed(2) : subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>GST</span>
                            <span>₹ {isBuyNow ? buyNowGst.toFixed(2) : gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping Payment</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total Payment</span>
                            <span>₹ {isBuyNow ? buyNowDiscountedTotal.toFixed(2) : finalTotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <p className="discount-applied">Discount applied: ₹{discount.toFixed(2)}</p>
                        )}

                        <button className="place-order-btn">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;