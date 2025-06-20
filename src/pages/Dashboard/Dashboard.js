import React from "react";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  // These values should come from your API or Redux later
  const totalUsers = 150;
  const totalProducts = 80;
  const totalOrders = 320;
  const totalCarts = 45;

  return (
    <div className="container-fluid">
      <h2 className="fw-bold mb-4 text-dark">Dashboard</h2>
      <div className="row g-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded text-center p-3 bg-primary text-white">
            <FaUsers size={36} className="text-primary mb-2" />
            <h5 className="fw-bold text-white">Total Users</h5>
            <p className="fs-4 fw-bold text-white">{totalUsers}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded text-center p-3 bg-info">
            <FaBoxOpen size={36} className="text-success mb-2" />
            <h5 className="fw-bold">Total Products</h5>
            <p className="fs-4 fw-bold  text-dark">{totalProducts}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded text-center p-3 bg-success">
            <FaClipboardList size={36} className="text-warning mb-2" />
            <h5 className="fw-bold">Total Orders</h5>
            <p className="fs-4 fw-bold  text-dark">{totalOrders}</p>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card shadow-sm rounded text-center p-3 bg-dark">
            <FaShoppingCart size={36} className="text-danger mb-2" />
            <h5 className="fw-bold text-white">Total Carts</h5>
            <p className="fs-4 fw-bold text-white ">{totalCarts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
