import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slices/productSlice";
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_API_IMAGE_KEY}`;
    try {
      const res = await axios.post(url, formData);
      return res.data.data.url;
    } catch (error) {
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (!image) {
      toast.error('Image is required');
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImageToImgBB(image);
      const payload = { ...data, image: imageUrl };

      const res = await dispatch(addProduct(payload));
      if (res?.payload?.code == 200) {
        navigate("/products");
        reset();
        setImage(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h4 className="mb-4 text-center">Add New Product</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Product Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Product name is required' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Price (₹)</label>
            <input
              type="number"
              step="0.01"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              {...register('price', {
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' }
              })}
            />
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Description</label>
            <textarea
              rows="3"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Category</label>
            <select
              className={`form-select ${errors.category ? 'is-invalid' : ''}`}
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">-- Select Category --</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Books">Books</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Automotive">Automotive</option>
              <option value="Grocery">Grocery</option>
              <option value="Pet Supplies">Pet Supplies</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Stock Count</label>
            <input
              type="number"
              className={`form-control ${errors.stock_count ? 'is-invalid' : ''}`}
              {...register('stock_count', {
                required: 'Stock count is required',
                min: { value: 0, message: 'Stock cannot be negative' }
              })}
            />
            {errors.stock_count && <div className="invalid-feedback">{errors.stock_count.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          {imagePreview && (
            <div className="mb-3 text-center">
              <label className="form-label">Image Preview:</label>
              <br />
              <img src={imagePreview} alt="Preview" width="200" className="img-thumbnail" />
            </div>
          )}

          <button
            type="submit"
            className="btn  btn-dark w-100 fw-semibold"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
