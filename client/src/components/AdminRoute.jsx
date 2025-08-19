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

        if (role !== "admin") {
          setIsAuth(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/admin/verify-token", {
          withCredentials: true,
        });

        if (res.data.success) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  if (isAuth === null) return null; // 🔄 Optionally show a loader

  return isAuth ? children : <Navigate to="/" replace />;
}

export default AdminRoute;
