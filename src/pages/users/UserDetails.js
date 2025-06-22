import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BallTriangle } from 'react-loader-spinner';
import { userDetails } from '../../store/slices/userSlice';
import { FaUser, FaMapMarkerAlt, FaAddressCard, FaArrowLeft } from 'react-icons/fa';

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(userDetails({ id })).then((res) => {
      if (res?.payload?.code == 200) {
        setUserData(res.payload.data);
      } else {
        setUserData(null);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    );
  }

  if (!userData) {
    return <div className="alert alert-warning mt-5 text-center">User not found</div>;
  }

  return (
    <div className="container mt-4">
      <Link to="/users" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" /> Back to Users
      </Link>

      <div className="card shadow-sm">
        <div className="card-header text-dark">
          <h5 className="mb-0">User Details</h5>
        </div>

        <div className="card-body">
          <div className="row align-items-center mb-4">
            <div className="col-md-3 text-center">
              <div className="rounded-circle bg-light d-inline-block" style={{ width: 120, height: 120 }}>
                <FaUser size={64} className="text-muted my-4" />
              </div>
            </div>
            <div className="col-md-9">
              <h5>{userData.full_name}</h5>
              <p className="mb-0 text-muted">{userData.email}</p>
              <p className="mb-0 text-muted">+{userData.country_code} {userData.mobile_number}</p>
              <p className="mb-0 text-muted">Last Login: {new Date(userData.last_login).toLocaleString()}</p>
            </div>
          </div>

          <hr />

          <div className="row g-4">
            <div className="col-md-6">
              <p><FaMapMarkerAlt className="me-2 text-muted" /><strong>Address:</strong> {userData.address || "N/A"}</p>
              <p><FaAddressCard className="me-2 text-muted" /><strong>Shipping Address:</strong> {userData.shipping_address || "N/A"}</p>
            </div>

            <div className="col-md-6">
              <p>
                <strong>Status:</strong>{' '}
                <span className={`badge ${userData.is_active ? 'bg-success' : 'bg-danger'}`}>
                  {userData.is_active ? 'Active' : 'Inactive'}
                </span>
              </p>
              <p>
                <strong>Login Status:</strong>{' '}
                <span className={`badge ${userData.login_status === 'Online' ? 'bg-info text-white' : 'bg-secondary'}`}>
                  {userData.login_status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
