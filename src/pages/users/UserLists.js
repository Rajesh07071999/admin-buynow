import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiEye, FiRepeat, FiTrash2 } from 'react-icons/fi';
import { userList, deleteUser, userChangeStatus } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { BallTriangle } from "react-loader-spinner";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchUserListing = () => {
    setLoading(true);
    dispatch(userList({}))
      .then((res) => {
        if (res?.payload?.code == 200) {
          setUsers(res.payload.data);
        } else {
          toast.error("Failed to load users");
          setUsers([]);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
        setUsers([]);
      })
      .finally(() => {
        setTimeout(() => {
        setLoading(false);
        },3000)
      });
  };

  useEffect(() => {
    fetchUserListing();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will delete the User.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ id })).then((res) => {
          if (res?.payload?.code == 200) {
            toast.success("User deleted");
            fetchUserListing();
          } else {
            toast.error("Failed to delete user");
          }
        }).catch(() => {
          toast.error('Server error while deleting user');
        });
      }
    });
  };

  const handleToggleStatus = (row) => {
    const newStatus = !row.is_active;

    Swal.fire({
      title: "Are you sure?",
      text: `You will change the status to ${newStatus ? 'Active' : 'Inactive'}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userChangeStatus({ id: row._id, status: newStatus }))
          .then((res) => {
            if (res?.payload?.code == 200) {
              toast.success(`User status updated to ${newStatus ? 'Active' : 'Inactive'}`);
              fetchUserListing();
            } else {
              toast.error("Failed to update status");
            }
          })
          .catch(() => {
            toast.error('Server error while updating status');
          });
      }
    });
  };

  const columns = [
    { name: '#', selector: (row, idx) => idx + 1, width: '60px' },
    { name: 'Name', selector: row => row.full_name, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    {
      name: 'Status',
      selector: row => row.is_active ? 'Active' : 'Inactive',
      sortable: true,
      cell: row => (
        <span className={`badge ${row.is_active ? 'bg-success' : 'bg-secondary'}`}>
          {row.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="d-flex gap-2">
          <Link to={`/userDetails/${row._id}`} className="text-dark" title="View">
            <FiEye size={20} />
          </Link>
          <Link className="text-dark" onClick={() => handleToggleStatus(row)} title="Toggle Status">
            <FiRepeat size={20} />
          </Link>
          <Link className="text-dark" onClick={() => handleDelete(row._id)} title="Delete">
            <FiTrash2 size={20} />
          </Link>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(filterText.toLowerCase()) ||
    user.email?.toLowerCase().includes(filterText.toLowerCase())
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
          title="User Listing"
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={subHeaderComponent}
          defaultSortField="full_name"
        />
      )}
    </div>
  );
};

export default UserList;
