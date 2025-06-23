import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTabs from './OrderTabs';

function OrderTable() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('Pending');

    const fetchOrders = async (status) => {
        try {
            setLoading(true);
            const url = status
                ? `http://localhost:5000/api/orders?status=${status}`
                : 'http://localhost:5000/api/orders';
            const res = await axios.get(url);
            console.log('Fetched orders:', res.data);
            setOrders(res.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to fetch orders');
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(selectedStatus);
    }, [selectedStatus]);

    const handleStatusChangeTab = (status) => {
        console.log('Status tab clicked:', status);
        setSelectedStatus(status);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            console.log('Updating status:', orderId, newStatus);
            await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            // eslint-disable-next-line
            alert('Failed to update status');
            console.error(err);
        }
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <OrderTabs onStatusChange={handleStatusChangeTab} selectedStatus={selectedStatus} />

            <table
                className="order-table"
                border={1}
                cellPadding={5}
                style={{ borderCollapse: 'collapse', width: '100%' }}
            >
                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>Company</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>
                                No {selectedStatus} orders found.
                            </td>
                        </tr>
                    ) : (
                        orders.map((o) => (
                            <tr key={o._id}>
                                <td>{o.medicine}</td>
                                <td>{o.company}</td>
                                <td>{o.quantity}</td>
                                <td>{o.status}</td>
                                <td>
                                    <select
                                        value={o.status}
                                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Received">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;
