import { useState } from 'react';
import './UserProfile.css';

const UserProfile = () => {
    const [formData, setFormData] = useState({
        firstName: 'Ankit',
        lastName: '',
        email: 'ankit@tranktechies.com',
        phone: '',
        panCard: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submission logic here
        console.log('Form Submitted', formData);
    };

    return (
        <form className="user-form" onSubmit={handleSubmit}>
            <div className="form-section">
                <div className="form-group">
                    <label>First Name<span className="required">*</span></label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Last Name<span className="required">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Phone No.<span className="required">*</span></label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email<span className="required">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>PAN Card</label>
                    <input type="text" name="panCard" value={formData.panCard} onChange={handleChange} />
                </div>

                <button className="submit-btn" type="submit">Save Change</button>
            </div>

            <div className="form-section">
                <h3>Password Change</h3>

                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>

                <button className="submit-btn" type="submit">Save Change</button>
            </div>
        </form>
    );
};

export default UserProfile;
