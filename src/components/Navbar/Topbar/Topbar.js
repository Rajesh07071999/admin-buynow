
import { Link, useNavigate } from 'react-router-dom'
import {
  FiMenu,
  FiBell
} from 'react-icons/fi'
import {
  FaUserCircle,
} from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/adminSlice';
import Swal from "sweetalert2";

function Topbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will Logout.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logged it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout({})).then((res) => {
          if (res?.payload?.code == 200) {
            localStorage.removeItem("adminToken");
            navigate("/");
          } else {

          }
        }).catch(() => {
        });
      }
    });
  };
  return (
    <>
      <nav className="topnav navbar navbar-light">
        <button
          type="button"
          className="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar"
          onClick={onToggleSidebar}
        >
          <FiMenu size={30} />
        </button>

        {/* <form className="form-inline mr-auto searchform text-muted">
        <input
          className="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted"
          type="search"
          placeholder="Type something..."
          aria-label="Search"
        />
      </form> */}

        <ul className="nav">
          {/* <li className="nav-item">
          <Link
            className="nav-link text-muted my-2"
            to="#"
            id="modeSwitcher"
            data-mode="light"
          >
            <FiSun size={16} />
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-muted my-2"
            to="#"
            data-toggle="modal"
            data-target=".modal-shortcut"
          >
            <FiGrid size={16} />
          </Link>
        </li> */}
          {/* <li className="nav-item nav-notif">
            <Link
              className="nav-link text-muted my-2"
              to="#"
              data-toggle="modal"
              data-target=".modal-notif"
            >
              <FiBell size={23} />
              <span className="dot dot-md bg-success" />
            </Link>
          </li> */}
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-muted pr-0"
              to="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="avatar avatar-sm mt-2">
                                  <FaUserCircle size={35} className="text-dark" />

              </span>
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Link className="dropdown-item" to="/profile/edit">
                Profile
              </Link>
              <Link className="dropdown-item" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>

      <div
        className="modal fade modal-notif modal-slide"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="defaultModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="defaultModalLabel">
                Notifications
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="list-group list-group-flush my-n3">
                <div className="list-group-item bg-transparent">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="fe fe-box fe-24" />
                    </div>
                    <div className="col">
                      <small>
                        <strong>Package has uploaded successfull</strong>
                      </small>
                      <div className="my-0 text-muted small">
                        Package is zipped and uploaded
                      </div>
                      <small className="badge badge-pill badge-light text-muted">
                        1m ago
                      </small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item bg-transparent">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="fe fe-download fe-24" />
                    </div>
                    <div className="col">
                      <small>
                        <strong>Widgets are updated successfull</strong>
                      </small>
                      <div className="my-0 text-muted small">
                        Just create new layout Index, form, table
                      </div>
                      <small className="badge badge-pill badge-light text-muted">
                        2m ago
                      </small>
                    </div>
                  </div>
                </div>
                <div className="list-group-item bg-transparent">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="fe fe-inbox fe-24" />
                    </div>
                    <div className="col">
                      <small>
                        <strong>Notifications have been sent</strong>
                      </small>
                      <div className="my-0 text-muted small">
                        Fusce dapibus, tellus ac cursus commodo
                      </div>
                      <small className="badge badge-pill badge-light text-muted">
                        30m ago
                      </small>
                    </div>
                  </div>{" "}
                  {/* / .row */}
                </div>
                <div className="list-group-item bg-transparent">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="fe fe-link fe-24" />
                    </div>
                    <div className="col">
                      <small>
                        <strong>Link was attached to menu</strong>
                      </small>
                      <div className="my-0 text-muted small">
                        New layout has been attached to the menu
                      </div>
                      <small className="badge badge-pill badge-light text-muted">
                        1h ago
                      </small>
                    </div>
                  </div>
                </div>{" "}
                {/* / .row */}
              </div>{" "}
              {/* / .list-group */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-block"
                data-dismiss="modal"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

    </>



  )
}

export default Topbar
