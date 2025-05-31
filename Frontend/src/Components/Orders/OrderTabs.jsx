function OrderTabs({ onStatusChange, selectedStatus }) {
    return (
        <div className="order-tabs">
            {['Pending', 'Received', 'Cancelled', 'Processing'].map((status) => (
                <button
                    key={status}
                    type="button" // ✅ Add this line
                    onClick={() => onStatusChange(status)}
                    style={{
                        marginRight: '10px',
                        padding: '8px 16px',
                        backgroundColor: selectedStatus === status ? '#4CAF50' : '#e0e0e0',
                        color: selectedStatus === status ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    {status}
                </button>
            ))}
        </div>
    );
}

export default OrderTabs;
