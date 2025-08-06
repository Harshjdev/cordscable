import "./ProductCard.css";
import { TiShoppingCart } from "react-icons/ti";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiInboxArrowDown } from "react-icons/hi2";
import { useContext } from "react"; // ✅
import { UserContext } from "../../Context/UserContext";
import { useCart } from "../../Context/CartContext";

const ProductCard = ({ product, setLoading, requestToQuote, hidePrice = false }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user, setIsLoginModalOpen, setPendingCheckout } = useContext(UserContext);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title.slice(0, 40)} added to cart!`);
    };
    const handleBuyNow = () => {
        if (!user) {
            setPendingCheckout({
                type: "buyNow",
                product: { ...product, quantity: 1 },
            });
            setIsLoginModalOpen(true);
            return;
        }

        navigate("/checkout", {
            state: { buyNowProduct: { ...product, quantity: 1 } },
        });
    };


    const handleNavtoDetail = () => {
        navigate(
            `/product-details?product_id=${product.id}&vendor_id=${product.vendor_id}`
        );
    };


    const isRequestQuote = (requestToQuote || product?.request_to_quote || "no")
        .trim()
        .toLowerCase() === "yes";

    return (
        <div className="card">
            <div className="clickcard" onClick={handleNavtoDetail}>
                {!isRequestQuote && product.discount && (
                    <div className="discount">{product.discount}%</div>
                )}

                <div className="image-wrapper">
                    <img
                        src={product.feature_image_url}
                        alt={product.title}
                        className="product-image"
                    />
                </div>

                <h3 className="title">
                    {product.title.length > 45
                        ? product.title.slice(0, 45) + "..."
                        : product.title}
                </h3>

                {/* ✅ Price only shows when not for quote and not hidden */}
                {!isRequestQuote && !hidePrice && (
                    <p>
                        <span className="price">₹{product.final_price}</span>{" "}
                        <span className="original-price">₹{product.price}</span>
                    </p>
                )}

                <p>{product.list1_value}</p>
                <p>{product.list2_value}</p>
                <p>{product.part_number}</p>
                <p onClick={handleNavtoDetail}>
                    <strong>Brand:</strong> {product.brand || product.brand_name}
                </p>
            </div>

            <div className="buybtns">
                {!isRequestQuote ? (
                    <>
                        <button className="buynow" onClick={handleBuyNow}>
                            <GiShoppingBag className="buyicon" /> Buy Now
                        </button>
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            <TiShoppingCart className="carticon" /> Add to Cart
                        </button>
                    </>
                ) : (
                    <button className="get-quote" onClick={handleNavtoDetail}>
                        <HiInboxArrowDown />
                        Request a Quote
                    </button>
                )}
            </div>
        </div>
    );
};


export default ProductCard;
