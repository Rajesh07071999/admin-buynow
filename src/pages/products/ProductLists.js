import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import { productListing, deleteProduct } from '../../store/slices/productSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { BallTriangle } from 'react-loader-spinner';
const ProductLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [productList, setProductList] = useState([]);
  const fetchProductListing = () => {
    setLoading(true);

    dispatch(productListing({}))
      .then((res) => {
        if (res?.payload?.code == 200) {
          setProductList(res.payload.data);
        } else {
          setProductList([]);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
        setProductList([]);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  useEffect(() => {
    fetchProductListing()
  }, [dispatch]);
  const deleteProducts = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will Delete Product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct({ id: id })).then((res) => {
          if (res?.payload?.code == 200) {

            fetchProductListing();
          } else {

          }
        }).catch(() => {
          toast.error('Server error while updating status');
        });
      }
    });
  };

  const columns = [
    {
      name: '#',
      cell: (row, index) => index + 1,
      width: '60px',
      sortable: false,
    },
    {
      name: 'Image',
      selector: row => (
        <img
          src={row.image || 'https://th.bing.com/th/id/OIP.Jsi1Tp3H8t-1v-8uJvZ9XwHaHP?r=0&rs=1&pid=ImgDetMain'}
          alt={row.name}
          style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
        />
      ),
      sortable: false,
      width: '80px'
    },
    {
      name: 'Product Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Price',
      selector: row => `₹${row.price}`,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.category,
      sortable: true,
    },
    {
      name: 'Actions',

      cell: row => (
        <div className="d-flex gap-2">
          <Link to={`/editProduct/${row._id}`}
            className="text-dark"
            onClick={() => console.log('Edit', row._id)}
          >
            <FiEdit size={20} />
          </Link>
          <Link
            className="text-dark"
            onClick={() => deleteProducts(row._id)}
          >
            <MdDelete size={20} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0"></h4>
        <button className="btn btn-dark" onClick={() => navigate('/addProducts')}>
          <AiOutlinePlus className="me-1" /> Add Product
        </button>
      </div>
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
          columns={columns}
          title="Product Listing"
          data={productList}
          pagination
          highlightOnHover
          responsive
          defaultSortFieldId={1}
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search..."
              className="form-control w-25"
              onChange={(e) => console.log('Search:', e.target.value)}
            />
          }
        />
      )}
    </div>
  );
};

export default ProductLists;
