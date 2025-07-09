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
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsAuth(true); // user is logged in
        } else {
          setIsAuth(false); // user not logged in
        }
      } catch (err) {
        setIsAuth(false);
      }
    };

    verify();
  }, []);
  if (isAuth === null) return null; // Loader lagana ho to yahan lagao

  // ✅ Agar login hai to /home redirect karo
  return isAuth ? <Navigate to="/home" replace /> : children;
}

export default PublicRoute;
