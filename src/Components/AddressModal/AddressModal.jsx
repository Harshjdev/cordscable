import React, { useState, useEffect } from "react";
import "./AddressModal.css";
import { saveUserAddress } from "../../store/Services/AllApi"; // Adjust path if needed
import { updateUserAddress } from "../../store/Services/AllApi";

const AddressModal = ({ onClose, selectedAddress }) => {
    const [billingAddress, setBillingAddress] = useState({
        bill_fname: "", bill_lname: "", bill_phone: "", bill_email: "",
        bill_company: "", bill_gst: "", bill_address1: "", bill_address2: "",
        bill_landmark: "", bill_city: "", bill_pin: "", bill_state: "", bill_country: ""
    });

    const [shippingAddress, setShippingAddress] = useState({
        ship_fname: "", ship_lname: "", ship_phone: "", ship_email: "",
        ship_company: "", ship_gst: "", ship_address1: "", ship_address2: "",
        ship_landmark: "", ship_city: "", ship_pin: "", ship_state: "", ship_country: ""
    });

    const [shippingSame, setShippingSame] = useState(false);
    const [selectState, setSelectState] = useState([]);
    const [selectCity, setSelectCity] = useState([]);
    const [selectedStateId, setSelectedStateId] = useState(null);


    useEffect(() => {
        if (selectedAddress) {
            const billing = selectedAddress.address?.billing_address || {};
            const shipping = selectedAddress.address?.shipping_address || {};
            const isShippingSame = selectedAddress.shipping_same_as_billing === true;
            console.log("billing from selectedAddress:", billing);
            setShippingSame(isShippingSame);
            setBillingAddress({
                bill_fname: billing.fname || "",
                bill_lname: billing.lname || "",
                bill_phone: billing.phone || "",
                bill_email: billing.email || "",
                bill_company: billing.company || "",
                bill_gst: billing.gst || "",
                bill_address1: billing.address1 || billing.address || "",
                bill_address2: billing.address2 || "",
                bill_landmark: billing.landmark || "",
                bill_city: billing.city || "",
                bill_pin: billing.pin || "",
                bill_state: billing.state || "",
                bill_country: billing.country || "",
            });

            const matchedState = selectState.find(
                (s) => s.state === billing.state
            );
            if (matchedState) {
                setSelectedStateId(matchedState.id);
            }

            if (!isShippingSame && shipping) {
                setShippingAddress({
                    ship_fname: shipping.fname || "",
                    ship_lname: shipping.lname || "",
                    ship_phone: shipping.phone || "",
                    ship_email: shipping.email || "",
                    ship_company: shipping.company || "",
                    ship_gst: shipping.gst || "",
                    ship_address1: shipping.address1 || shipping.address || "",
                    ship_address2: shipping.address2 || "",
                    ship_landmark: shipping.landmark || "",
                    ship_city: shipping.city || "",
                    ship_pin: shipping.pin || "",
                    ship_state: shipping.state || "",
                    ship_country: shipping.country || "",
                });
            }

            setShippingSame(isShippingSame);
        }
    }, [selectedAddress, selectState]);



    useEffect(() => {
        fetch("https://cords.tranktechnologies.com/api/state-list")
            .then((res) => res.json())
            .then((data) => {
                if (data.status && Array.isArray(data.data)) {
                    setSelectState(data.data);
                }
            })
            .catch((err) => console.error("State fetch error:", err));
    }, []);

    useEffect(() => {
        if (selectedStateId) {
            fetch(`https://cords.tranktechnologies.com/api/cities-list?state_id=${selectedStateId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status && Array.isArray(data.data)) {
                        setSelectCity(data.data);
                    }
                })
                .catch((err) => console.error("City fetch error:", err));
        } else {
            setSelectCity([]);
        }
    }, [selectedStateId]);





    const handleBillingChange = (e) => {
        const { name, value } = e.target;

        if (name === "bill_state") {
            const selectedIndex = e.target.selectedIndex;
            const stateId = e.target.options[selectedIndex].dataset.id;

            setSelectedStateId(stateId);
            setBillingAddress((prev) => ({
                ...prev,
                bill_state: value,
                bill_city: "",
            }));
        } else {
            setBillingAddress((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };



    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setShippingSame(checked);
        if (checked) {
            setShippingAddress({
                ship_fname: billingAddress.bill_fname, ship_lname: billingAddress.bill_lname,
                ship_phone: billingAddress.bill_phone, ship_email: billingAddress.bill_email,
                ship_company: billingAddress.bill_company, ship_gst: billingAddress.bill_gst,
                ship_address1: billingAddress.bill_address1, ship_address2: billingAddress.bill_address2,
                ship_landmark: billingAddress.bill_landmark, ship_city: billingAddress.bill_city,
                ship_pin: billingAddress.bill_pin, ship_state: billingAddress.bill_state, ship_country: billingAddress.bill_country,
            });
        } else {
            setShippingAddress({
                ship_fname: "", ship_lname: "", ship_phone: "", ship_email: "",
                ship_company: "", ship_gst: "", ship_address1: "", ship_address2: "",
                ship_landmark: "", ship_city: "", ship_state: "", ship_country: "", ship_pin: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.user_id) {
            alert("User not found in localStorage");
            return;
        }

        // Consolidate all form data into a single object
        const addressFields = {
            ...billingAddress,
            shipping_same_as_billing: shippingSame,
            ...(shippingSame ? {} : shippingAddress),
        };

        try {
            if (selectedAddress) {

                const updatePayload = {
                    user_id: user.user_id,
                    address_id: selectedAddress.id,
                    ...addressFields,
                };


                const response = await updateUserAddress(updatePayload);
                console.log("Address updated:", response);
                alert("Address updated successfully!");

            } else {

                const savePayload = {
                    user_id: user.user_id,
                    ...addressFields,
                };

                const response = await saveUserAddress(savePayload);
                console.log("Address saved:", response);
                alert("Address saved successfully!");
            }

            onClose();
        } catch (error) {
            console.error("Failed to submit address:", error);

            alert(`Failed to save address: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                <div className="modal-header">
                    <h3>Enter Address</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit} className="address-form">
                    <h4>Billing Address</h4>
                    <div className="form-row">
                        <div className="form-group">
                            <label>First Name <span className="required">*</span></label>
                            <input
                                name="bill_fname"
                                value={billingAddress.bill_fname}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name <span className="required">*</span></label>
                            <input
                                name="bill_lname"
                                value={billingAddress.bill_lname}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone <span className="required">*</span></label>
                            <input
                                type="text"
                                name="bill_phone"
                                value={billingAddress.bill_phone}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email <span className="required">*</span></label>
                            <input
                                type="email"
                                name="bill_email"
                                value={billingAddress.bill_email}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                name="bill_company"
                                value={billingAddress.bill_company}
                                onChange={handleBillingChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>GST</label>
                            <input
                                type="text"
                                name="bill_gst"
                                value={billingAddress.bill_gst}
                                onChange={handleBillingChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Address Line 1 <span className="required">*</span></label>
                            <input
                                type="text"
                                name="bill_address1"
                                value={billingAddress.bill_address1}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address Line 2</label>
                            <input
                                type="text"
                                name="bill_address2"
                                value={billingAddress.bill_address2}
                                onChange={handleBillingChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Landmark</label>
                        <input
                            type="text"
                            name="bill_landmark"
                            value={billingAddress.bill_landmark}
                            onChange={handleBillingChange}
                        />
                    </div>
                    <div className="form-row">

                        <div className="form-group">
                            <label>State <span className="required">*</span></label>
                            <select
                                name="bill_state"
                                value={billingAddress.bill_state}
                                onChange={handleBillingChange}
                                required
                                className="selectstate"
                            >
                                <option value="">Select State</option>
                                {selectState.map((state) => (
                                    <option
                                        key={state.id}
                                        value={state.state}
                                        data-id={state.id}
                                    >
                                        {state.state}
                                    </option>
                                ))}
                            </select>

                        </div>
                        <div className="form-group">
                            <label>City <span className="required">*</span></label>
                            <select
                                name="bill_city"
                                value={billingAddress.bill_city}
                                onChange={handleBillingChange}
                                required
                                className="selectstate"
                            >
                                <option value="">Select City</option>
                                {selectCity.map((city) => (
                                    <option key={city.id} value={city.city}>
                                        {city.city}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>


                    <div className="form-row">
                        <div className="form-group">
                            <label>Pincode <span className="required">*</span></label>
                            <input
                                type="text"
                                name="bill_pin"
                                value={billingAddress.bill_pin}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Country <span className="required">*</span></label>
                            <input
                                type="text"
                                name="bill_country"
                                value={billingAddress.bill_country}
                                onChange={handleBillingChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={shippingSame}
                                onChange={handleCheckboxChange}
                            />
                            Shipping address same as billing
                        </label>
                    </div>


                    {!shippingSame && (
                        <>
                            <h4>Shipping Address</h4>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        name="ship_fname"
                                        value={shippingAddress.ship_fname}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        name="ship_lname"
                                        value={shippingAddress.ship_lname}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        name="ship_phone"
                                        value={shippingAddress.ship_phone}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="ship_email"
                                        value={shippingAddress.ship_email}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        name="ship_company"
                                        value={shippingAddress.ship_company}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>GST</label>
                                    <input
                                        type="text"
                                        name="ship_gst"
                                        value={shippingAddress.ship_gst}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Address Line 1</label>
                                    <input
                                        type="text"
                                        name="ship_address1"
                                        value={shippingAddress.ship_address1}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address Line 2</label>
                                    <input
                                        type="text"
                                        name="ship_address2"
                                        value={shippingAddress.ship_address2}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Landmark</label>
                                <input
                                    type="text"
                                    name="bill_landmark"
                                    value={billingAddress.bill_landmark}
                                    onChange={handleBillingChange}
                                />
                            </div>
                            <div className="form-row">

                                <div className="form-group">
                                    <label>State <span className="required">*</span></label>
                                    <select
                                        name="bill_state"
                                        value={shippingAddress.ship_state}
                                        onChange={handleShippingChange}
                                        required
                                        className="selectstate"
                                    >
                                        <option value="">Select State</option>
                                        {selectState.map((state) => (
                                            <option
                                                key={state.id}
                                                value={state.state}
                                                data-id={state.id}
                                            >
                                                {state.state}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                                <div className="form-group">
                                    <label>City <span className="required">*</span></label>
                                    <select
                                        name="bill_city"
                                        value={shippingAddress.ship_city}
                                        onChange={handleShippingChange}
                                        required
                                        className="selectstate"
                                    >
                                        <option value="">Select City</option>
                                        {selectCity.map((city) => (
                                            <option key={city.id} value={city.city}>
                                                {city.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="ship_pin"
                                        value={shippingAddress.ship_pin}
                                        onChange={handleShippingChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="ship_country"
                                        value={shippingAddress.ship_country}
                                        onChange={handleShippingChange}
                                    />
                                </div>
                            </div>

                        </>
                    )}

                    <div className="save-btn-group">
                        <button type="submit" className="save-button">Save Address</button>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddressModal;