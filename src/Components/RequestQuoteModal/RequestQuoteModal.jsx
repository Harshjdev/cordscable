import { useEffect, useState } from "react";
import "./RequestQuoteModal.css";

const RequestQuoteModal = ({ isModalOpen, setIsModalOpen }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        pincode: ""
    });

    useEffect(() => {
        if (isModalOpen) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                setFormData((prev) => ({
                    ...prev,
                    name: parsedUser?.full_name || "",
                    email: parsedUser?.email || "",
                    phone: parsedUser?.phone_no || "",
                }));
            }
        }
    }, [isModalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Quote request submitted.");
        setIsModalOpen(false);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    if (!isModalOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <button className="modal-close" onClick={handleClose}>×</button>
                <h2>Request a Quote</h2>
                <p>Please fill out the form below and we will get back to you shortly.</p>
                <form onSubmit={handleSubmit} className="quote-form">
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Email Address:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Pincode:
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            required
                        ></textarea>
                    </label>
                    <button type="submit" className="submit-btn">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RequestQuoteModal;
