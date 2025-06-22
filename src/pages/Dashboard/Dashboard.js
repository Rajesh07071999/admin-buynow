import React, { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaClipboardList } from "react-icons/fa";
import { adminDashboard } from "../../store/slices/adminSlice";
import { useDispatch } from "react-redux";
import CountUp from 'react-countup';
import { BallTriangle } from "react-loader-spinner"
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);

  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalCarts: 0
  });

  useEffect(() => {
    setLoading(true);
    dispatch(adminDashboard({})).then((res) => {
      if (res?.payload?.code == 200) {
        setTimeout(() => {
          setDashboardData({
            totalUsers: res.payload.data?.totalUsers || 0,
            totalProducts: res.payload.data?.totalProducts || 0,
            totalOrders: res.payload.data?.totalOrders || 0,
            totalCarts: res.payload.data?.totalCarts || 0
          });
          setMonthlyStats(res.payload.data?.monthlyStats || []);
          setCategoryStats(res.payload.data?.categoryStats || []);
          setLoading(false);

        }, 3000)

      }
    }).catch(() => {
      setLoading(false);
    });
  }, [dispatch]);


  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4 text-dark">Dashboard</h2>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm rounded text-center p-3 bg-primary text-white">
              <FaUsers size={36} className="text-light mb-2" />
              <h5 className="fw-bold text-white">Total Users</h5>
              <p className="fs-4 fw-bold text-white">
                <CountUp end={dashboardData.totalUsers} duration={1.5} />
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm rounded text-center p-3 bg-info text-white">
              <FaBoxOpen size={36} className="text-light mb-2" />
              <h5 className="fw-bold">Total Products</h5>
              <p className="fs-4 fw-bold text-white">
                <CountUp end={dashboardData.totalProducts} duration={1.5} />
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm rounded text-center p-3 bg-success text-white">
              <FaClipboardList size={36} className="text-light mb-2" />
              <h5 className="fw-bold">Total Orders</h5>
              <p className="fs-4 fw-bold text-white">
                <CountUp end={dashboardData.totalOrders} duration={1.5} />
              </p>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card shadow-sm rounded text-center p-3 bg-dark text-white">
              <FaShoppingCart size={36} className="text-light mb-2" />
              <h5 className="fw-bold text-white">Total Carts</h5>
              <p className="fs-4 fw-bold text-white">
                <CountUp end={dashboardData.totalCarts} duration={1.5} />
              </p>
            </div>
          </div>
          <div className="row g-4 mt-4">
            <div className="col-lg-8">
              <div className="card p-3 shadow-sm">
                <h5 className="fw-bold mb-3">Monthly Revenue & Orders</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyStats}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue (₹)" />
                    <Line type="monotone" dataKey="orderCount" stroke="#82ca9d" name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card p-3 shadow-sm">
                <h5 className="fw-bold mb-3">Product Categories</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryStats}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      fill="#8884d8"
                      label
                    >
                      {categoryStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index % 4]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;
