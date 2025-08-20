import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function PublicRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          "https://furgetnot.onrender.com/api/user/verify-token",
          { withCredentials: true }
        );
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

  if (isAuth === null) return null;

  return isAuth ? <Navigate to="/home" replace /> : children;
}

export default PublicRoute;
