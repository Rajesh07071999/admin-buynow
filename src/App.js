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
const AboutUs = Loadable(lazy(() => import('./pages/app-settings/AboutUs.js')))

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
              <Route path="/about-us" element={<AboutUs />} />
        
            
          

            </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
