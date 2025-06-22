import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { editProduct, productListing } from "../../store/slices/productSlice";
import { useDispatch } from "react-redux";
import { BallTriangle } from 'react-loader-spinner';
import axios from 'axios';

const EditProduct = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    setLoading(true);
    dispatch(productListing({ id })).then((res) => {
      if (res?.payload?.code == 200) {
        const product = res.payload.data[0];
        setValue("name", product.name);
        setValue("price", product.price);
        setValue("description", product.description);
        setValue("category", product.category);
        setValue("stock_count", product.stock_count);
        setExistingImageUrl(product.image);
        setImagePreview(product.image);
      } else {
        // toast.error("Failed to load product details.");
      }
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    });
  }, [dispatch, id, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(existingImageUrl);
    }
  };

  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_API_IMAGE_KEY}`;
    const res = await axios.post(url, formData);
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl = existingImageUrl;

      if (image instanceof File) {
        toast.info("Uploading image...");
        imageUrl = await uploadImageToImgBB(image);
      }

      const payload = {
        id,
        ...data,
        image: imageUrl,
      };

      const res = await dispatch(editProduct(payload));
      if (res?.payload?.code == 200) {
        navigate("/products");
        reset();
        setImage(null);
        setImagePreview(null);
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BallTriangle height={100} width={100} color="#4fa94d" ariaLabel="loading" visible />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h4 className="mb-4">Edit Product</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                {...register('name', { required: 'Product name is required' })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Price (₹)</label>
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

            <div className="col-md-12 mb-3">
              <label className="form-label">Description</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                rows="3"
                {...register('description', { required: 'Description is required' })}
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Category</label>
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

            <div className="col-md-6 mb-3">
              <label className="form-label">Stock Count</label>
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

            <div className="col-md-6 mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="col-md-6 mb-3 text-center">
                <label className="form-label">Image Preview</label>
                <div>
                  <img src={imagePreview} alt="Preview" width="200" className="img-thumbnail" />
                </div>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/products" className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn  btn-dark">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
