import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiInfo } from "react-icons/fi";
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
        {/* nav bar */}
        <div className="w-100 mb-4 d-flex">
          <Link
            className="navbar-brand mx-auto mt-2 flex-fill text-center"
            href="/dashboard"
          >
            <svg
              version="1.1"
              id="logo"
              className="navbar-brand-img brand-sm"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 120 120"
              xmlSpace="preserve"
            >
              <g>
                <polygon className="st0" points="78,105 15,105 24,87 87,87 	" />
                <polygon className="st0" points="96,69 33,69 42,51 105,51 	" />
                <polygon className="st0" points="78,33 15,33 24,15 87,15 	" />
              </g>
            </svg>
          </Link>
        </div>
        <ul className="navbar-nav flex-fill w-100 mb-2">
          <li
            className={`${
              path === "/dashboard" ? "nav-item menuitem-active" : "nav-item"
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
              to="/about-us"
              data-toggle="collapse"
              aria-expanded="false"
              className=" nav-link"
            >
              <FiInfo size={20} />
              <span className="ml-3 item-text">About Us</span>
              <span className="sr-only">(current)</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
