import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://furgetnot.onrender.com/api/order/getallorders", {
        withCredentials: true,
      });

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getDeliveryStatus = (createdAt) => {
    const orderTime = new Date(createdAt);
    const deliveryTime = new Date(orderTime.getTime() + 45 * 60000); // 45 minutes
    const remaining = deliveryTime - now;

    if (remaining <= 0) return <span className="text-green-600 font-semibold">✅ Item delivered</span>;

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    return (
      <span className="text-blue-600 font-semibold">
        ⏳ Estimated Delivery in: {minutes}m {seconds}s
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded shadow">
                <div className="mb-2 text-gray-600 text-sm">
                  <span className="font-semibold">Order Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Shipping Info</h3>
                  <p>{order.customer.name}</p>
                  <p>
                    {order.customer.address}, {order.customer.city} -{" "}
                    {order.customer.pincode}
                  </p>
                  <p>
                    {order.customer.number} | {order.customer.email}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Items</h3>
                  <ul className="divide-y">
                    {order.cart.map((item, idx) => (
                      <li
                        key={idx}
                        className="py-2 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">
                          ₹{item.price * item.qty}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    Total: ₹{order.totalAmount.toFixed(2)}
                  </p>
                  <p
                    className={`px-3 py-1 rounded text-sm font-semibold ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus} Payment Mode : {order.paymentType}
                  </p>
                </div>

                <div className="text-sm">{getDeliveryStatus(order.createdAt)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
