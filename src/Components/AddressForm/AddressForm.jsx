import React, { useState } from 'react';
import './AddressForm.css';
import { saveUserAddress } from '../../store/Services/AllApi';
const AddressForm = () => {
    const [showShipping, setShowShipping] = useState(true);

    const [billingAddress, setBillingAddress] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        company: "",
        gst: "",
        street: "",
        city: "",
        state: "Delhi",
        pin: "",
        country: "India",
    });

    const [shippingAddress, setShippingAddress] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        company: "",
        gst: "",
        street: "",
        city: "",
        state: "Andaman & Nicobar Islands",
        pin: "",
        country: "India",
    });

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        try {
            const result = await saveUserAddress({
                user_id: 97,
                address: {
                    billing_address: billingAddress,
                    shipping_address: showShipping ? shippingAddress : null
                }
            });

            console.log("Saved:", result);
            alert("Address saved successfully!");
        } catch (error) {
            console.error("Error saving address:", error);
            alert("Failed to save address");
        }
    };


    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <h2>Billing Address</h2>
            <div className="form-grid">
                <div>
                    <label>First Name</label>
                    <input type="text" name="fname" value={billingAddress.fname} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lname" value={billingAddress.lname} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="tel" name="phone" value={billingAddress.phone} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={billingAddress.email} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Company name (optional)</label>
                    <input type="text" name="company" value={billingAddress.company} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>GST No.</label>
                    <input type="text" name="gst" value={billingAddress.gst} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Street Address *</label>
                    <input type="text" name="street" value={billingAddress.street} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Town / City *</label>
                    <input type="text" name="city" value={billingAddress.city} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>State</label>
                    <select name="state" value={billingAddress.state} onChange={handleBillingChange}>
                        <option>Delhi</option>
                        <option>Maharashtra</option>
                    </select>
                </div>
                <div>
                    <label>PIN *</label>
                    <input type="text" name="pin" value={billingAddress.pin} onChange={handleBillingChange} />
                </div>
                <div>
                    <label>Country *</label>
                    <select name="country" value={billingAddress.country} onChange={handleBillingChange}>
                        <option>India</option>
                        <option>USA</option>
                    </select>
                </div>
            </div>

            <label className="checkbox">
                <input
                    type="checkbox"
                    checked={showShipping}
                    onChange={() => setShowShipping(!showShipping)}
                />
                Ship to a different address?
            </label>

            {showShipping && (
                <>
                    <h2>Shipping Address</h2>
                    <div className="form-grid">
                        <div>
                            <label>First Name *</label>
                            <input type="text" name="fname" value={shippingAddress.fname} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Last Name *</label>
                            <input type="text" name="lname" value={shippingAddress.lname} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Phone *</label>
                            <input type="tel" name="phone" value={shippingAddress.phone} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Email *</label>
                            <input type="email" name="email" value={shippingAddress.email} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Company name (optional)</label>
                            <input type="text" name="company" value={shippingAddress.company} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>GST No.</label>
                            <input type="text" name="gst" value={shippingAddress.gst} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Street Address *</label>
                            <input type="text" name="street" value={shippingAddress.street} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Town / City *</label>
                            <input type="text" name="city" value={shippingAddress.city} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>State</label>
                            <select name="state" value={shippingAddress.state} onChange={handleShippingChange}>
                                <option>Andaman & Nicobar Islands</option>
                                <option>Delhi</option>
                            </select>
                        </div>
                        <div>
                            <label>PIN *</label>
                            <input type="text" name="pin" value={shippingAddress.pin} onChange={handleShippingChange} />
                        </div>
                        <div>
                            <label>Country *</label>
                            <select name="country" value={shippingAddress.country} onChange={handleShippingChange}>
                                <option>India</option>
                                <option>USA</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            <button type="submit" className="save-btn">Save address</button>
        </form>
    );
};

export default AddressForm;
