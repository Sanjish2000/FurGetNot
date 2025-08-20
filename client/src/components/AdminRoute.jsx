// src/components/AdminRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function AdminRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const role = localStorage.getItem("role");

        // 🚫 If not admin in localStorage → reject immediately
        if (role !== "admin") {
          setIsAuth(false);
          return;
        }

        // ✅ Verify with backend
        const res = await axios.get(
          "https://furgetnot.onrender.com/api/admin/verify-token",
          { withCredentials: true }
        );

        if (res.data.success && role === "admin") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("AdminRoute Error:", err);
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  if (isAuth === null) return null; // 🔄 loader (spinner) dikha sakte ho
  return isAuth ? children : <Navigate to="/" replace />;
}

export default AdminRoute;
