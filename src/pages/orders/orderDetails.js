import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch } from "react-redux";
import { BallTriangle } from 'react-loader-spinner';
import { orderListing } from "../../store/slices/orderSlice";

const statusSteps = [
  'Pending',
  'Progress',
  'Confirmed',
  'Delivered',
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'Confirmed':
      return 'bg-success';
    case 'Pending':
      return 'bg-warning text-dark';
    case 'Cancelled':
      return 'bg-danger';
    case 'Delivered':
      return 'bg-primary';
    case 'Rejected':
      return 'bg-secondary';
    case 'Progress':
      return 'bg-info text-white';
    default:
      return 'bg-light text-dark';
  }
};

const isTerminalStatus = (status) => ['Cancelled', 'Rejected'].includes(status);

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(orderListing({ id: id })).then((res) => {
      if (res?.payload?.code == 200) {
        setOrder(res.payload.data[0]);
      } else {
        setOrder(null);
      }
     setTimeout(() => {
       setLoading(false);
     }, 2000);
    });
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="loading"
          visible={true}
        />
      </div>
    );
  }

  if (!order) return <div className="text-center mt-5">No data available</div>;

  const { userDetails, productDetails, price, qty, status, createdAt } = order;
  const product = productDetails?.[0];

  return (
    <div className="container mt-4">
      <Link to="/orders" className="btn btn-outline-secondary mb-3">
        <FiArrowLeft /> Back to Orders
      </Link>

      <div className="card">
        <div className="card-header text-dark">
          <h5>Order Details</h5>
        </div>

        <div className="card-body">
          {/* Product Image */}
          <div className="text-center my-4">
            {product?.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <div className="placeholder-glow" style={{ width: '200px', height: '200px', margin: '0 auto', backgroundColor: '#eaeaea' }} />
            )}
          </div>

          {/* User Info */}
          <p><strong>User:</strong> {userDetails.full_name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>

          {/* Order Meta */}
          <p><strong>Ordered On:</strong> {new Date(createdAt).toLocaleString()}</p>

          {/* Status Badge */}
          <p>
            <strong>Status:</strong>{' '}
            <span className={`badge ${getStatusBadge(status)}`}>
              {status}
            </span>
          </p>

          {/* Status Progress Bar */}
          <div className="status-progress-bar my-4">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= statusSteps.indexOf(status);
              return (
                <div key={step} className={`step ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-circle">{index + 1}</div>
                  <div className="step-label">{step}</div>
                  {index < statusSteps.length - 1 && (
                    <div className={`step-bar ${index < statusSteps.indexOf(status) ? 'filled' : ''}`}></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Show Cancelled or Rejected message */}
          {isTerminalStatus(status) && (
            <div className={`text-center mt-3 badge ${getStatusBadge(status)}`} style={{ fontSize: '1rem' }}>
              Order has been <strong>{status}</strong>
            </div>
          )}

          {/* Product Info */}
          <p className='mt-3'><strong>Product:</strong> {product?.name}</p>
          <p><strong>Unit Price:</strong> ₹{price}</p>
          <p><strong>Quantity:</strong> {qty}</p>
          <p><strong>Total Amount:</strong> ₹{price * qty}</p>
        </div>

        {/* Delivery Date */}
        {order.orderDetails?.[0]?.delivery_date && (
          <div className="card-footer">
            <p><strong>Delivery Date:</strong> {new Date(order.orderDetails[0].delivery_date).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      <style>{`
        .status-progress-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 600px;
          margin: 0 auto;
        }
        .step {
          position: relative;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .step-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #ccc;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          z-index: 2;
        }
        .step-label {
          margin-top: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .step-bar {
          position: absolute;
          top: 15px;
          left: 50%;
          height: 6px;
          width: 100%;
          background-color: #ccc;
          z-index: 1;
        }
        .step-bar.filled {
          background-color: #0d6efd; /* Bootstrap primary color */
        }
        .step.completed .step-circle {
          background-color: #0d6efd;
        }
      `}</style>
    </div>
  );
};

export default OrderDetails;
