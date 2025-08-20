// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children, allowedRole }) {
  const [auth, setAuth] = useState({ isAuth: null, role: null });

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          "https://furgetnot.onrender.com/api/user/verify-token",
          { withCredentials: true }
        );

        if (res.data.success) {
          setAuth({ isAuth: true, role: res.data.role }); // role backend se bhejna padega
        } else {
          setAuth({ isAuth: false, role: null });
        }
      } catch (err) {
        setAuth({ isAuth: false, role: null });
      }
    };

    verify();
  }, []);

  if (auth.isAuth === null) return null; // loader lagana ho to yahan lagao

  if (!auth.isAuth) return <Navigate to="/" replace />;

  // ✅ role check bhi karo
  if (allowedRole && auth.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
