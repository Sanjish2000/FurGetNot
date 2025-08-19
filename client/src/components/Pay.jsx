import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Pay() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("tempOrder");
    if (stored) {
      const parsed = JSON.parse(stored);
      setOrderData(parsed);
    } else {
      setError("No order data found. Please place the order again.");
    }
    setLoading(false);
  }, []);

  const calculateSubtotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleCreateOrder = async (paymentMode) => {
    if (!orderData) return;

    const { name, address, city, pincode, number, email, cart } = orderData;
    const subtotal = calculateSubtotal(cart);
    const totalAmount = subtotal + 50 + subtotal * 0.05;

    if (paymentMode === "Online") {
      try {
        // 1. Create Razorpay Order from backend
        const res = await axios.post(
          "https://furgetnot.onrender.com/api/payment/order",
          {
            amount: Math.round(totalAmount * 100)
          }
        );

        const { order } = res.data;

        // 2. Open Razorpay Checkout
        const options = {
          key: "rzp_test_4oRfFqtdSftily", // ✅ Replace with your key_id
          amount: order.amount,
          currency: "INR",
          name: "Pet Store",
          description: "Pet Food Purchase",
          image: "/logo192.png",
          order_id: order.id,
          handler: async function (response) {
            // 3. After successful payment
            const orderPayload = {
              name,
              address,
              city,
              pincode,
              number,
              email,
              cart,
              totalAmount,
              paymentMode: "Online",
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            const saveRes = await axios.post(
              "https://furgetnot.onrender.com/api/order/create",
              orderPayload,
              { withCredentials: true }
            );

            if (saveRes.data.success) {
              toast.success("Payment successful!");
              localStorage.removeItem("cartItems");
              localStorage.removeItem("tempOrder");
              navigate("/orders");
            } else {
              toast.error("Order save failed after payment");
            }
          },
          prefill: {
            name,
            email,
            contact: number,
          },
          theme: {
            color: "#38a169",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay Order Error:", err);
        toast.error("Failed to initiate payment.");
      }
      return;
    }

    // ✅ Cash on Delivery (COD)
    const orderPayload = {
      name,
      address,
      city,
      pincode,
      number,
      email,
      cart,
      totalAmount,
      paymentMode: "COD",
    };

    try {
      const res = await axios.post(
        "https://furgetnot.onrender.com/api/order/create",
        orderPayload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Order placed successfully (COD)!");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("tempOrder");
        navigate("/orders");
      } else {
        toast.error("Order creation failed");
      }
    } catch (err) {
      console.error("Order Error:", err);
      toast.error("Failed to place COD order");
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="text-xl font-semibold text-gray-700">
            Loading order data...
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
            <p className="mt-2 text-sm">
              Please try again from the checkout page.
            </p>
          </div>
        </div>
      </>
    );
  }

  if (!orderData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="text-xl font-semibold text-gray-700">
            No order data available.
          </div>
        </div>
      </>
    );
  }

  const subtotal = calculateSubtotal(orderData.cart);
  const deliveryFee = 50;
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + deliveryFee + taxAmount;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 w-full max-w-3xl border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-green-700 mb-2">
              Order Summary
            </h1>
            <p className="text-gray-600 text-lg">Your purchase details</p>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Order Preview
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Total Items:</span>{" "}
                {orderData.cart.length}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Estimated Total:</span> ₹
                {grandTotal.toFixed(2)}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Customer Information
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Name:</span> {orderData.name}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Address:</span>{" "}
                {orderData.address}, {orderData.city} - {orderData.pincode}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Contact:</span> {orderData.number}{" "}
                / {orderData.email}
              </p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Items Ordered
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-3 px-4 text-right text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderData.cart.map((item) => (
                    <tr
                      key={item._id || item.name}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-800 flex items-center">
                        <img
                          src={
                            item.image ||
                            `https://placehold.co/50x50/E0E0E0/333333?text=${item.name.substring(
                              0,
                              5
                            )}`
                          }
                          alt={item.name}
                          className="w-10 h-10 rounded mr-3 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/50x50/E0E0E0/333333?text=Item";
                          }}
                        />
                        {item.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {item.qty}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-full sm:w-1/2 lg:w-2/5 space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee:</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax ({taxRate * 100}%):</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-xl border-t-2 border-dashed border-gray-300 pt-3 mt-3">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Buttons */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Choose Payment Method
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => handleCreateOrder("COD")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
              >
                Cash on Delivery (COD)
              </button>
              <button
                onClick={() => handleCreateOrder("Online")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 w-full sm:w-auto"
              >
                Pay with Razorpay
              </button>
            </div>
          </div>

          {/* Thank You */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200 text-gray-500 text-sm">
            <p className="mb-2">Thank you for your order!</p>
            <p>We appreciate your business.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pay;
