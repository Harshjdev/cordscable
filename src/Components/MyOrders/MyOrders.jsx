import './MyOrders.css';

const orders = [
    { id: 1, date: '01-09-2023', status: 'Pending Payment', total: 1334.58 },
    { id: 2, date: '26-09-2023', status: 'Order Received', total: 904.62 },
    { id: 3, date: '29-10-2023', status: 'Order Received', total: 118147.06 },
    { id: 4, date: '11-03-2024', status: 'Order Received', total: 273.28 },
    { id: 5, date: '11-03-2024', status: 'Order Received', total: 273.28 },
    { id: 6, date: '11-03-2024', status: 'Order Received', total: 273.28 },
    { id: 7, date: '11-03-2024', status: 'Order Received', total: 273.28 },
    { id: 8, date: '11-03-2024', status: 'Order Received', total: 139398.35 },
    { id: 9, date: '11-03-2024', status: 'Order Received', total: 1676.3 },
    { id: 10, date: '11-03-2024', status: 'Order Received', total: 1676.3 }
];

const MyOrders = () => {
    return (
        <div className="orders-container">
            <div className="filters">
                <select>
                    <option>Select</option>
                </select>
                <input type="date" />
                <input type="date" />
                <button className="submit-btn">Submit</button>
            </div>

            <h2>My Orders</h2>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>#Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td><a href={`/order/${order.id}`}>{order.id}</a></td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>₹ {order.total.toLocaleString()}</td>
                            <td>
                                <button className="view-btn">View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
