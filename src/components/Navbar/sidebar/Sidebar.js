import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiBox, FiHome, FiInfo, FiList, FiShoppingCart, FiUser } from "react-icons/fi";
import { FaBoxOpen, FaList } from "react-icons/fa";
const Sidebar = ({ collapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const path = "/" + location?.pathname?.split("/")?.[1];
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    updateBodyCollapsed(newState);
  };

  const updateBodyCollapsed = (isCollapsed) => {
    document.body.classList.toggle("collapsed", isCollapsed);
  };

  const onMouseEnter = () => {
    if (collapsed) document.body.classList.add("hover");
  };

  const onMouseLeave = () => {
    if (collapsed) document.body.classList.remove("hover");
  };
  console.log(path);

  useEffect(() => {
    setCollapsed(collapse);
    updateBodyCollapsed(collapse);
  }, [collapse]);

  const sidebarClass = "sidebar-left border-right bg-white shadow";
  return (
    <aside
      id="leftSidebar"
      className={sidebarClass}
      data-simplebar=""
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href=""
        className="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3"
        data-toggle="toggle"
        onClick={toggleSidebar}
      >
        <i className="fe fe-x">
          <span className="sr-only" />
        </i>
      </Link>
      <nav className="vertnav navbar navbar-light">
        <div className="w-100 mb-4 d-flex">
          <Link
            className="navbar-brand mx-auto mt-2 flex-fill text-center"
            to="/dashboard"
            style={{ fontSize: "2.5rem" }}
          >
            🛍️
          </Link>
        </div>


        <ul className="navbar-nav flex-fill w-100 mb-2">
          <li
            className={`${path === "/dashboard" ? "nav-item menuitem-active" : "nav-item"
              }`}
          >
            <Link
              to="/dashboard"
              data-toggle="collapse"
              aria-expanded="false"
              className="nav-link"
            >
              <FiHome size={20} />
              <span className="ml-3 item-text">Dashboard</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/users"
              data-toggle="collapse"
              aria-expanded="false"
              className=" nav-link"
            >
              <FiUser size={20} />
              <span className="ml-3 item-text">Users</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              data-toggle="collapse"
              aria-expanded="false"
              className=" nav-link"
            >
              <FaBoxOpen size={20} />
              <span className="ml-3 item-text">Products</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/orders"
              data-toggle="collapse"
              aria-expanded="false"
              className=" nav-link"
            >
              <FaList size={20} />
              <span className="ml-3 item-text">Orders</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/carts"
              data-toggle="collapse"
              aria-expanded="false"
              className=" nav-link"
            >
              <FiShoppingCart size={20} />
              <span className="ml-3 item-text">Carts</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
