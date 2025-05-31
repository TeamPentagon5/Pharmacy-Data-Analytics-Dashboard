import React, { useState } from 'react';
import axios from 'axios';
import './orderForm.scss';

function OrderForm() {
    const [formData, setFormData] = useState({
        medicine: '',
        genericName: '',
        quantity: '',
        deliveryDate: '',
        company: '',
        status: 'Pending',
    });

    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/orders', formData);
        // eslint-disable-next-line no-alert
        alert('Order placed successfully!');
        setFormData({
            medicine: '',
            genericName: '',
            quantity: '',
            deliveryDate: '',
            company: '',
            status: 'Pending',
        });
        setIsFormVisible(false); // Collapse form after submit
    };

    return (
        <div className="order-form-container">
            {!isFormVisible && (
                <button type="button" className="toggle-button" onClick={toggleForm}>
                    Place Order
                </button>
            )}

            {isFormVisible && (
                <form className="order-form" onSubmit={handleSubmit}>
                    <h3>Place New Order</h3>
                    <input
                        type="text"
                        placeholder="Medicine Name"
                        value={formData.medicine}
                        onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Generic Name"
                        value={formData.genericName}
                        onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                    />
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Received">Received</option>
                        <option value="Processing">Processing</option>
                    </select>
                    <div className="form-actions">
                        <button type="submit">Submit Order</button>
                        <button type="button" onClick={toggleForm}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default OrderForm;
