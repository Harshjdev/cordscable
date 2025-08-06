import { useEffect, useRef } from "react";
import "./PriceBreakdownPopup.css";

const PriceBreakdownPopup = ({ subtotal, gstAmount, total, onClose }) => {
    const popupRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="price-breakdown-popover" ref={popupRef}>
            <div><span>Amount</span><span>₹ {subtotal.toFixed(2)}</span></div>
            <div><span>18% GST</span><span>₹ {gstAmount.toFixed(2)}</span></div>
            <div><span>Shipping</span><span>Free</span></div>
            <hr />
            <div className="total-row"><span>Total</span><span>₹ {total.toFixed(2)}</span></div>
        </div>
    );
};

export default PriceBreakdownPopup;
