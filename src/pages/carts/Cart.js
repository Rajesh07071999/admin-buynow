import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiEye, FiRepeat, FiTrash2 } from 'react-icons/fi';
import { cartListing } from "../../store/slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';

const Cart = () => {
  const [userCarts, setUserCart] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartListing = async () => {
      try {
        setLoading(true);
        const res = await dispatch(cartListing({}));
        if (res?.payload?.code == 200) {
          setUserCart(res.payload.data);
          console.log(res.payload.data);
        } else {
          setUserCart([]);
        }
      } catch (error) {
        setUserCart([]);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    fetchCartListing();
  }, [dispatch]);

  const columns = [
    { name: '#', selector: (row, idx) => idx + 1, width: '60px' },
    {
      name: 'User Name',
      selector: row => row.userDetails?.full_name || 'N/A',
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.userDetails?.email || 'N/A',
      sortable: true
    },
    {
      name: 'Product Name',
      selector: row => row.productDetails?.name || 'N/A',
      sortable: true
    },
    {
      name: 'Price',
      selector: row => row.productDetails?.price || 0,
      sortable: true
    },
      {
      name: 'Quantity',
      selector: row => row.qty || 0,
      sortable: true
    },
    {
      name: 'Date',
      selector: row => new Date(row.createdAt).toLocaleDateString(),
      sortable: true
    }
  ];


  const filteredUsers = userCarts.filter(u =>
    u.userDetails?.full_name?.toLowerCase().includes(filterText.toLowerCase()) ||
    u.userDetails?.email?.toLowerCase().includes(filterText.toLowerCase())
  );


  const subHeaderComponent = (
    <input
      type="text"
      placeholder="Search by name or email"
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
          title="Cart Listing"
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortField="userDetails.full_name"
        />

      )}
    </div>
  );
};

export default Cart;
