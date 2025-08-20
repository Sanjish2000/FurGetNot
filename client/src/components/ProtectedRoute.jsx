// src/components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children, allowedRole = "user" }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          "https://furgetnot.onrender.com/api/user/verify-token",
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          const role = localStorage.getItem("role");

          if (role === allowedRole) {
            setIsAuth(true);
          } else {
            setIsAuth(false);
          }
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    verify();
  }, [allowedRole]);

  if (isAuth === null) return null; // 🔄 loader show karna hai to yahan dikhado
  return isAuth ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
