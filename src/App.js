import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute.js";
import PublicRoute from "./components/PublicRoute.js";
export const Loadable = (Component) => (props) => {
  return (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
};
const Login = Loadable(lazy(() => import("./pages/auth/Login/Login.js")))
const DashboardLayout = Loadable(lazy(() => import("./components/DashboardLayout/DashboardLayout.js")))
const Dashboard = Loadable(lazy(() => import('./pages/Dashboard/Dashboard.js')));
const NotFound = Loadable(lazy(() => import('./components/NotFound/NotFound.js')))
const OrderLists = Loadable(lazy(() => import('./pages/orders/OrderLists.js')))
const UserLists = Loadable(lazy(() => import('./pages/users/UserLists.js')))
const ProductLists = Loadable(lazy(() => import('./pages/products/ProductLists.js')))
const Cart = Loadable(lazy(() => import('./pages/carts/Cart.js')))
const EditProfile = Loadable(lazy(() => import('./pages/profile/EditProfile.js')))
const AddProduct = Loadable(lazy(() => import('./pages/products/addProduct.js')))
const EditProduct = Loadable(lazy(() => import('./pages/products/editProduct.js')))
const UserDetails = Loadable(lazy(() => import('./pages/users/UserDetails.js')))
const OrderDetails = Loadable(lazy(() => import('./pages/orders/orderDetails.js')))
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path='*' element={<NotFound />} />
              <Route path='/not-found' element={<NotFound />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<OrderLists />} />
              <Route path="/addProducts" element={<AddProduct />} />
              <Route path="/products" element={<ProductLists />} />
              <Route path="/users" element={<UserLists />} />
              <Route path="/carts" element={<Cart />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/userDetails/:id" element={<UserDetails />} />
              <Route path="/orderDetails/:id" element={<OrderDetails />} />
              <Route path="/editProduct/:id" element={<EditProduct />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
