import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Registor";
import Home from "./pages/Home/Home";
import About from "./pages/Auth/About/About";
import Admin from "./pages/Admin/Admin";
import AdminRoute from "./components/AdminRoute"; // ✅ import this
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AddPetFood from "./components/AddPetFood";
import Store from "./components/Store";
import Checkout from "./components/Checkout";
import Pay from "./components/Pay";
import Orders from "./components/Orders";
import ProductPage from "./components/ProductPage";
import ContactUs from "./components/ContactUs";
import Vetclinic from "./components/Vetclinic";

function App() {
  return (
    <>
      <Routes>
        {/* ✅ Public pages → only for not logged in users */}
        <Route
          path="/"
          element={
            
              <Landing />
         
          }
        />
        <Route
          path="/login"
          element={
           
              <Landing/>
           
          }
        />
        <Route
          path="/registration"
          element={
           
              <Landing />
           
          }
        />

        {/* ✅ User-only routes */}
        <Route
          path="/home"
          element={
           
              <Home />
            
          }
        />
        <Route
        path="/product/detailed"
        element={
          <ProtectedRoute allowedRole="user">
            <ProductPage/>
          </ProtectedRoute>
        }
        
        />
        <Route 
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactUs/>
          </ProtectedRoute>
        }/>

        <Route
        path="/vetclinic"
        element={
          <ProtectedRoute>
            <Vetclinic/>
          </ProtectedRoute>
        }/>
        <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRole="user">
            <Orders/>
          </ProtectedRoute>
        }
        />
          <Route
          path="/store"
          element={
            <ProtectedRoute allowedRole="user">
              <Store />
            </ProtectedRoute>
          }
        />
         <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRole="user">
              <Checkout />
            </ProtectedRoute>
          }
        />
         <Route
          path="/checkout/process-to-pay"
          element={
            <ProtectedRoute allowedRole="user">
              <Pay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRole="user">
              <About />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin-only route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
              </AdminRoute>
          }
        />
        <Route
          path="/addpetfood"
          element={
            <AdminRoute>
              <AddPetFood />
              </AdminRoute>
          }
        />
      </Routes>
      
    </>
  );
}

export default App;
