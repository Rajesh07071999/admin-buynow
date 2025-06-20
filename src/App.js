import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"

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
function App() {

  return (
    <>
      <BrowserRouter basename='/admin'>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route element={<Protected />}> */}
            <Route element={<DashboardLayout />}>
              <Route path='*' element={<NotFound />} />
              <Route path='/not-found' element={<NotFound />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/orders" element={<OrderLists />} />
              <Route path="/products" element={<ProductLists />} />
              <Route path="/users" element={<UserLists />} />
              <Route path="/carts" element={<Cart />} />
              <Route path="/profile/edit" element={<EditProfile />} />
            </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
