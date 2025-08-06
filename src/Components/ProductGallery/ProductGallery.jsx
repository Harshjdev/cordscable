import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../Context/CartContext";
import { getSpecificationDetails } from "../../store/Services/AllApi";
import { getProductReviews } from "../../store/Services/AllApi";
import "./ProductGallery.css";
import "../../Pages/ProductDetails/ProductDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDeliveryDays } from "../../store/Services/AllApi";
import RequestQuoteModal from "../RequestQuoteModal/RequestQuoteModal";
import { FaBox, FaCreditCard, FaTags } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { HiNewspaper } from "react-icons/hi2";
import { useLocation } from "react-router-dom";
import Tags from "../Tags/Tags";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";

// Helper functions for variant logic
const buildVariantQuery = (productId, variantObj) => {
    let query = `product_id=${productId}`;
    for (const [key, value] of Object.entries(variantObj)) {
        if (value) {
            query += `&search[${key}]=${encodeURIComponent(value)}`;
        }
    }
    return query;
};




const getVariantType = (code) => {
    if (code.includes('colour')) return 'primary';
    if (code.includes('packing_size')) return 'secondary';
    return 'other';
};

const ProductGallery = ({ product,
    variantList,
    variantSummary,
    requestToQuote,
    isModalOpen,
    openQuoteModal,
    setIsModalOpen,
    onVendorSelect
}) => {
    const navigate = useNavigate();
    const [otherVendors, setOtherVendors] = useState([]);
    const location = useLocation()
    const { addToCart } = useCart();
    const imageRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
    const [displayedProduct, setDisplayedProduct] = useState(product);
    const [hoveredImage, setHoveredImage] = useState(null); // For the main large image
    const [galleryImages, setGalleryImages] = useState([]); // Specifically for the thumbnails
    const [specifications, setSpecifications] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [availablePackingSizes, setAvailablePackingSizes] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState("");
    const [bestCourier, setBestCourier] = useState(null);
    const [deliveryError, setDeliveryError] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const productId = searchParams.get("product_id");
        const vendorId = searchParams.get("vendor_id");

        if (productId && vendorId) {
            fetchOtherVendorDiscount(productId, vendorId);
        }
    }, [location.search]);

    const fetchOtherVendorDiscount = async (productId, vendorId) => {
        try {
            const response = await fetch(
                `https://cords.tranktechnologies.com/api/other-vendors-discount?product_id=${productId}&vendor_id=${vendorId}`
            );
            const result = await response.json();

            if (result.status) {
                setOtherVendors(result.data || []);
            } else {
                toast.error("Failed to fetch other vendor data.");
            }
        } catch (error) {
            console.error("Error fetching vendor discounts:", error);
            toast.error("Something went wrong.");
        }
    };
    useEffect(() => {
        setDisplayedProduct(product);
    }, [product]);

    useEffect(() => {
        setDisplayedProduct(product);
    }, [product]);

    useEffect(() => {
        if (!displayedProduct) return;

        setHoveredImage(displayedProduct.feature_image_url || null);
        setGalleryImages(Array.isArray(displayedProduct.gallery_images) ? displayedProduct.gallery_images : []);

        if (displayedProduct.varientData) {
            const parsed = JSON.parse(displayedProduct.varientData);
            setSelectedOptions(parsed);

            const primaryKey = Object.keys(parsed).find(k => getVariantType(k) === 'primary');
            if (primaryKey && variantList) {
                updateAvailableSizes(primaryKey, parsed[primaryKey]);
            }
        }

        const fetchSpecifications = async () => {
            try {
                const response = await getSpecificationDetails({
                    category_id: displayedProduct.category_id,
                    sub_category_id: displayedProduct.sub_category_id,
                    brand_id: displayedProduct.brand_id,
                    product_id: displayedProduct.id,
                });

                if (response.status && Array.isArray(response.data)) {
                    setSpecifications(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch specifications:", err);
            }
        };

        const fetchReviews = async () => {
            try {
                const data = await getProductReviews({ product_id: displayedProduct.id });

                if (data.status && Array.isArray(data.reviews)) {
                    setReviews(data.reviews);
                    setAverageRating(data.average_rating);
                    setTotalReviews(data.total_reviews);
                }
            } catch (err) {
                console.error("Failed to fetch reviews:", err);
            }
        };

        fetchSpecifications();
        fetchReviews();
    }, [displayedProduct, variantList]);



    const handleBuyNow = () => {
        const buyNowProduct = {
            ...displayedProduct,
            quantity,
        };
        navigate("/checkout", { state: { buyNowProduct } });
    };


    const handleAddToCart = () => {
        const selectedVariantInfo = {};
        const currentSelections = JSON.parse(displayedProduct.varientData || '{}');
        for (const [code, value] of Object.entries(currentSelections)) {
            const variantDetail = variantSummary.find(summary => summary.code === code);

            if (variantDetail) {
                selectedVariantInfo[variantDetail.name] = value;
            }
        }

        const productForCart = {
            ...displayedProduct,
            quantity,
            selectedVariantInfo,
        };

        addToCart(productForCart);
        console.log("varinfo", selectedVariantInfo)
        toast.success(`${displayedProduct.title.slice(0, 40)} added to cart!`);
    };


    const updateAvailableSizes = (primaryKey, primaryValue) => {
        if (!variantList) return;
        const availableSizes = variantList
            .filter(variant => JSON.parse(variant.varientData || '{}')[primaryKey] === primaryValue)
            .map(variant => {
                const data = JSON.parse(variant.varientData || '{}');
                const secondaryKey = Object.keys(data).find(k => getVariantType(k) === 'secondary');
                return data[secondaryKey];
            });
        setAvailablePackingSizes(new Set(availableSizes));
    };


    const handleOptionSelect = (code, value) => {
        const type = getVariantType(code);

        if (type === 'primary') {
            const firstMatchingVariant = variantList.find(variant => {
                try {
                    const data = JSON.parse(variant.varientData || '{}');
                    return data[code] === value;
                } catch (e) {
                    return false;
                }
            });

            if (firstMatchingVariant) {
                const fullSelection = JSON.parse(firstMatchingVariant.varientData || '{}');
                triggerVariantFetch(fullSelection);
            } else {
                console.warn(`No valid variant combination found for ${code}: ${value}`);
                setSelectedOptions({ [code]: value });
                updateAvailableSizes(code, value);
            }

        } else {
            const newSelection = { ...selectedOptions, [code]: value };
            triggerVariantFetch(newSelection);
        }
    };

    const triggerVariantFetch = async (selection) => {
        const vendorId = product?.vendor_id || product?.vendorId;

        if (!vendorId) {
            toast.error("Missing vendor ID.");
            return;
        }

        const queryString = buildVariantQuery(product.id, selection) + `&vendor_id=${vendorId}`;
        const apiUrl = `https://cords.tranktechnologies.com/api/product-details?${queryString}`;

        navigate(`?${queryString}`, { replace: true });
        setLoading(true);

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            if (data.status && data.data && data.data.length > 0) {
                const newProductData = data.data[0];
                setDisplayedProduct(newProductData);
            } else {
                toast.error("Could not load the selected variant.");
            }
        } catch (error) {
            toast.error("An error occurred while loading the variant.");
        } finally {
            setLoading(false);
        }
    };


    const checkDelivery = async () => {
        if (!pincode) {
            setDeliveryError("Please enter a valid pincode.");
            return;
        }

        setDeliveryError("");
        setBestCourier(null);

        try {
            const data = await getDeliveryDays({
                delivery_postcode: pincode,
                weight: displayedProduct.weight,
            });

            if (data.status && data.best_courier) {
                setBestCourier(data.best_courier);
            } else {
                setDeliveryError("Delivery not available for this pincode.");
            }
        } catch (error) {
            setDeliveryError("Something went wrong. Try again.");
            console.error("Delivery check error:", error);
        }
    };

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const bounds = imageRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        const halfLens = 100;
        const clampedX = Math.max(halfLens, Math.min(x, bounds.width - halfLens));
        const clampedY = Math.max(halfLens, Math.min(y, bounds.height - halfLens));
        setLensPosition({ x: clampedX, y: clampedY });
    };

    const longDescription = specifications.find(spec => spec.column_name === "Long Description" && spec.title_code && spec.title_code.trim().toLowerCase() !== "n/a")?.title_code;
    const primaryVariantSelected = Object.keys(selectedOptions).some(k => getVariantType(k) === 'primary');

    if (!displayedProduct) {
        return <FullScreenLoader />;
    }

    console.log("reqqq", requestToQuote)
    console.log("display", displayedProduct?.drums)
    return (
        <div className="product-detail-parent">
            {loading && <FullScreenLoader />}
            <div className="image-wrap">
                <div className="zoom-preview-wrapper">
                    <div
                        className="main-image-container"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img src={hoveredImage} alt="Main Preview" className="main-image" ref={imageRef} />
                        {isHovering && (
                            <div className="lens" style={{ top: lensPosition.y - 100, left: lensPosition.x - 100 }}>
                                <p className="pluslens">+</p>
                            </div>
                        )}
                    </div>
                    {isHovering && imageRef.current && (
                        <div className="zoom-box">
                            <div
                                className="zoom-image"
                                style={{
                                    backgroundImage: `url(${hoveredImage})`,
                                    backgroundPosition: `${(lensPosition.x / imageRef.current.offsetWidth) * 100}% ${(lensPosition.y / imageRef.current.offsetHeight) * 100}%`,
                                    backgroundSize: `${imageRef.current.offsetWidth * 2}px ${imageRef.current.offsetHeight * 2}px`,
                                }}
                            ></div>
                        </div>
                    )}
                </div>

                <div className="thumbnail-section">
                    <div className="thumbnail-slider">
                        {galleryImages.map((img, i) => (
                            <div key={img || i} className="thumbnail-box" onClick={() => setHoveredImage(img)}>
                                <img src={img} alt={`Thumb ${i}`} className="thumbnail-image" />
                            </div>
                        ))}
                    </div>
                </div>

                {Array.isArray(displayedProduct.tags) && displayedProduct.tags.length > 0 && (
                    <Tags tagsData={displayedProduct.tags} limit={2} enableShowMore={true} />
                )}
            </div>

            <div className="scrollable-content">
                <div className="product-info-scrollable">
                    <div className="product-info-container">
                        <h1 className="product-title">{displayedProduct.title}</h1>

                        {requestToQuote === "No" && (
                            <>
                                <div className="price-block">
                                    {displayedProduct.per_meter_price > 0 && displayedProduct.per_meter_final_price > 0 ? (
                                        <>
                                            {displayedProduct.per_meter_price !== displayedProduct.per_meter_final_price && (
                                                <s className="original-price">₹ {displayedProduct.per_meter_price}</s>
                                            )}
                                            <span className="final-price">₹ {displayedProduct.per_meter_final_price}</span>
                                            <p className="perm">per /m</p>
                                            {displayedProduct.discount > 0 && (
                                                <span className="discount"> {displayedProduct.discount}% Off</span>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {displayedProduct.price !== displayedProduct.final_price && (
                                                <s className="original-price">₹ {displayedProduct.price}</s>
                                            )}
                                            <span className="final-price">₹ {displayedProduct.final_price}</span>
                                            {displayedProduct.discount > 0 && (
                                                <span className="discount"> {displayedProduct.discount}% Off</span>
                                            )}
                                        </>
                                    )}
                                </div>
                                <p className="note-text">(Exc. of all taxes) * Shipping charges may be applicable</p>
                                {displayedProduct?.drums?.length > 0 && (
                                    <div className="variant-group">
                                        <label>Available Drums (in {displayedProduct.measurement_unit})</label>
                                        <div className="variant-options">
                                            {displayedProduct.drums.map((drum) => (
                                                <button key={drum.id} className="variant-option-button">
                                                    {drum.length_size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}




                        {/* Variant summary section stays visible */}
                        <div className="variant-summary-section">
                            {variantSummary.map((variant) => {
                                const type = getVariantType(variant.code);
                                if (type === 'secondary' && !primaryVariantSelected) {
                                    return (
                                        <div key={variant.code} className="variant-group">
                                            <label><strong>{variant.name}:</strong></label>
                                            <div className="variant-options disabled-group">
                                                {variant.values.map((val) => (
                                                    <button key={val.value} className="variant-option-button" disabled>{val.value}</button>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <div key={variant.code} className="variant-group">
                                        <label><strong>{variant.name}:</strong></label>
                                        <div className="variant-options">
                                            {variant.values.map((val) => {
                                                const isDisabled = type === 'secondary' && availablePackingSizes ? !availablePackingSizes.has(val.value) : false;
                                                return (
                                                    <button
                                                        key={val.value}
                                                        className={`variant-option-button ${selectedOptions[variant.code] === val.value ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                                                        onClick={() => !isDisabled && handleOptionSelect(variant.code, val.value)}
                                                        disabled={isDisabled}
                                                        title={isDisabled ? 'Not available for selected color' : ''}
                                                    >
                                                        {val.value}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    <div className="offers-coupons-container">
                        <h2 className="section-title"><FaBox className="offerboxicon" />Offers and Coupons</h2>
                        <div className="offer-block green-offer">
                            <h3 className="offer-title"><FaCreditCard className="creditcardicon" />Pay online & get extra OFF</h3>
                            <p className="offer-desc">Using UPI, EMI, Credit/Debit Card, Net Banking, Wallets on min. cart value of ₹10,000 in Urja Lite Ceiling Fans</p>
                        </div>
                        <div className="offer-block coupon-offer">
                            <h3 className="offer-title"><FaTags />Coupons</h3>
                            <ul className="coupon-list"><li><code>Cords123</code> Flat ₹1000 OFF – Min cart ₹5000</li></ul>
                        </div>
                        <div className="offer-block additional-shop">
                            <h3 className="offer-title"><FaTags />Additionaly you can shop here</h3>
                            <div className="vendor-suggestion">
                                {otherVendors.length > 0 &&
                                    otherVendors.map((vendor) => (
                                        <div className="vendor-box" key={vendor.id}>
                                            <p className="vendor-link-line">
                                                <a
                                                    href="#"
                                                    className="vendor-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        onVendorSelect(vendor.user_id);
                                                    }}
                                                >
                                                    {vendor.vendor_name}
                                                </a>{" "}
                                                offering @ ₹{vendor.vendor_value_with_margin} –{" "}
                                                <strong>Delivery in {vendor.delivery_days || 3} days</strong>
                                            </p>
                                        </div>
                                    ))}
                            </div>



                        </div>
                    </div>


                    <div className="specifications-container">
                        <h2 className="section-title"><HiNewspaper /> Specifications</h2>
                        {specifications?.filter(spec => spec.title_code && spec.title_code.trim().toLowerCase() !== "n/a" && spec.column_name !== "Long Description")?.length > 0 ? (
                            <table className="spec-table">
                                <tbody>
                                    {specifications.filter(spec => spec.title_code && spec.title_code.trim().toLowerCase() !== "n/a" && spec.column_name !== "Long Description")
                                        .map((spec, index) => (<tr key={index}><th>{spec.column_name}</th><td>{spec.title_code}</td></tr>))}
                                </tbody>
                            </table>
                        ) : (<p className="no-specs">No specifications available.</p>)}
                    </div>

                    <h2 className="itemdesc">Item Descreption</h2>
                    {longDescription && (<p className="spec-desc">{longDescription}</p>)}

                    <div className="reviews-section">
                        <h2 className="section-title">⭐ Reviews & Ratings</h2>
                        <div className="average-rating">
                            <span className="rating-score">{averageRating.toFixed(1)}</span>
                            <span className="stars">{"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}</span>
                            <span className="total-reviews">({totalReviews} reviews)</span>
                        </div>
                        <div className="review-list">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div className="review-item" key={index}>
                                        <div className="review-header">
                                            <span className="reviewer-name">{review.user_name}</span>
                                            <span className="review-stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                                            <span className="review-date">{new Date(review.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <strong className="review-title">{review.title}</strong>
                                        <p className="review-text">{review.comment}</p>
                                    </div>
                                ))
                            ) : (<p>No reviews available.</p>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="cart-section">
                {requestToQuote === "No" ? (
                    <div className="cart-content">
                        <p className="inclusive-price">₹{displayedProduct.final_price} (Exc. of all taxes)</p>
                        <h2 className="final-price">
                            ₹{displayedProduct.final_price} <span className="gst">+{displayedProduct.gst}% GST</span>
                        </h2>
                        <p className="mrp">
                            MRP <del>₹{displayedProduct.price}</del> <span className="discount">{displayedProduct.discount}% OFF</span>
                        </p>

                        <div className="quantity-section">
                            <div className="quantity-controls">
                                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                                <input type="text" value={quantity} readOnly />
                                <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
                            </div>
                        </div>

                        <button className="add-to-cart-btn" onClick={handleAddToCart}>🛒 ADD TO CART</button>
                        <button className="buy-now-btn" onClick={handleBuyNow}>BUY NOW</button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <p className="quotetxt">
                            To receive a personalized quotation for this product please click on the <strong>"Request a Quote"</strong> button below.
                        </p>
                        <button className="add-to-cart-btn" onClick={openQuoteModal}>Request a Quote</button>
                        <RequestQuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                    </div>
                )}
                <div className="delivery-section">
                    <p className="deliveryhead">Delivery Date</p>
                    <div className="delivery-details-box">
                        <label className="pincode-label">
                            <i className="fas fa-map-marker-alt"></i>
                            <input type="text" placeholder="Enter Delivery Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} className="pincode-input" />
                            <button className="check-btn" onClick={checkDelivery}>CHECK</button>
                        </label>
                        <small className="service-check-msg">Enter your area’s pincode to check if delivery is available.</small>
                        <div className="delivery-info">
                            {deliveryError && (<p style={{ color: "red", marginBottom: "8px" }}>{deliveryError}</p>)}
                            {bestCourier && (
                                <div className="delivery-estimate">
                                    <p><i className="fas fa-clock"></i> Estimated Delivery:{" "}<strong>{bestCourier.estimated_delivery}</strong></p>
                                    <p><i className="fas fa-truck"></i> Courier:{" "}<strong>{bestCourier.courier_name}</strong></p>
                                    <p><i className="fas fa-rupee-sign"></i> Shipping Cost: ₹<strong>{bestCourier.rate}</strong></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;