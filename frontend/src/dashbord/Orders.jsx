import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dash from '../components/Dash';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:7000/read/orders');
      setOrders(res.data);
    } catch {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleMarkDelivered = async (orderId) => {
    try {
      await axios.delete(`http://localhost:7000/delete/order/${orderId}`);
      fetchOrders();
    } catch {
      alert('Failed to mark as delivered');
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div className=''>

    <div className='fixed top-0 left-0 w-full z-10'>
      <Dash />
    </div>
    <div className='ml-[340px] px-5 my-4'>
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 bg-white shadow">
              <h3 className="font-semibold text-lg mb-2">Customer: {order.customerName || 'Unknown'}</h3>
              <div className="mb-1 text-sm text-gray-600">Email: {order.customerEmail || 'N/A'}</div>
              <div className="mb-1 text-sm text-gray-600">Phone: {order.customerPhone || 'N/A'}</div>
              <div className="mb-2">Total Amount: <span className="font-bold">${order.TotalAmount}</span></div>
              <div className="mb-2">
                Delivery Status: <span className={order.delivered ? "text-green-600 font-bold" : "text-yellow-600 font-bold"}>
                  {order.delivered ? "Delivered" : "Pending"}
                </span>
                {!order.delivered && (
                  <button
                    className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleMarkDelivered(order._id)}
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {order.Products.map((item, idx) => (
                  <div key={idx} className="border p-3 rounded flex items-center space-x-4">
                    {item.prImg && (
                      <img
                        src={`http://localhost:7000/AlImages/${item.prImg}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-bold">{item.name || 'Unknown Product'}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: ${item.price || 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    </>

  );
}

export default Orders


