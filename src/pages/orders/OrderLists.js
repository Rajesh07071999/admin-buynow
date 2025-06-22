import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiEye, FiCheckCircle, FiXCircle, FiTruck } from 'react-icons/fi'; // Added FiTruck
import { orderListing, orderUpdateStatas } from "../../store/slices/orderSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { BallTriangle } from 'react-loader-spinner';

const Order = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [filterText, setFilterText] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchOrderListing = () => {
    setLoading(true);

    dispatch(orderListing({}))
      .then((res) => {
        if (res?.payload?.code == 200) {
          setUserOrder(res.payload.data);
        } else {
          setUserOrder([]);
        }
      })
      .catch(() => {
        setUserOrder([]);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };
  useEffect(() => {
    fetchOrderListing();
  }, [dispatch]);

  const updateStatus = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will change the status to "${newStatus}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(orderUpdateStatas({ id: id, status: newStatus })).then((res) => {
          if (res?.payload?.code == 200) {
            fetchOrderListing();
          } else {
          }
        }).catch(() => {
          toast.error('Server error while updating status');
        });
      }
    });
  };

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
      default:
        return 'bg-light text-dark';
    }
  };

  const columns = [
    { name: '#', selector: (row, idx) => idx + 1, width: '60px' },
    {
      name: 'Image',
      cell: row => (
        <img
          src={row.productDetails?.[0]?.image || 'https://th.bing.com/th/id/OIP.Jsi1Tp3H8t-1v-8uJvZ9XwHaHP?r=0&rs=1&pid=ImgDetMain'}
          alt="Product"
          style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ),
      width: '80px'
    },
    {
      name: 'Product',
      selector: row => row.productDetails?.[0]?.name || 'N/A',
      sortable: true,
    },
    {
      name: 'User',
      selector: row => row.userDetails?.full_name || 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.userDetails?.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `₹${row.price}`,
      sortable: true,
    },
    {
      name: 'Qty',
      selector: row => row.qty,
      sortable: true,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${getStatusBadge(row.status)}`}>
          {row.status}
        </span>
      ),
      sortable: true
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2 align-items-center">
          <Link to={`/orderDetails/${row.orderDetails[0]._id}`} className="text-dark" title="View">
            <FiEye size={18} />
          </Link>

          {(row.status === 'Pending' || row.status === 'Rejected') && (
            <FiCheckCircle
              size={20}
              color="green"
              style={{ cursor: 'pointer' }}
              title="Accept"
              onClick={() => updateStatus(row._id, 'Confirmed')}
            />
          )}

          {row.status === 'Confirmed' && (
            <FiTruck
              size={20}
              color="blue"
              style={{ cursor: 'pointer' }}
              title="Mark as Delivered"
              onClick={() => updateStatus(row._id, 'Delivered')}
            />
          )}

          {(row.status === 'Pending' || row.status === 'Confirmed') && (
            <FiXCircle
              size={20}
              color="red"
              style={{ cursor: 'pointer' }}
              title="Reject"
              onClick={() => updateStatus(row._id, 'Rejected')}
            />
          )}
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const filteredData = userOrder.filter(order =>
    order.userDetails?.full_name?.toLowerCase().includes(filterText.toLowerCase()) ||
    order.userDetails?.email?.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponent = (
    <input
      type="text"
      placeholder="Search by user or email"
      className="form-control mb-3"
      style={{ maxWidth: '300px' }}
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
    />
  );

  return (
    <div className="container mt-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
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
      ) : (
        <DataTable
          title="All User Orders"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={subHeaderComponent}
        />
      )}
    </div>
  );
};

export default Order;
