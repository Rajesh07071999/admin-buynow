import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adminProfile, editProfile } from "../../store/slices/adminSlice";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";

const EditProfile = () => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(true);
    const { loading } = useSelector((state) => state.admin);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                setLoader(true);
                const res = await dispatch(adminProfile({}));
                if (res?.payload?.code == 200) {
                    setUserData(res.payload.data);
                } else {
                }
            } catch {
                toast.error("Something went wrong!");
            } finally {
                setTimeout(() => setLoader(false), 1500);
            }
        };
        fetchAdminProfile();
    }, [dispatch]);

    useEffect(() => {
        if (userData) {
            reset({
                firstname: userData.firstname || "",
                lastname: userData.lastname || "",
                email: userData.email || "",
                country_code: userData.country_code || "+91",
                mobile_number: userData.mobile_number || "",
            });
        }
    }, [userData, reset]);

    const onSubmit = (data) => {
        dispatch(editProfile({ data })).then((res) => {
            if (res?.payload?.code == 200) {
            } else {
                toast.error("Failed to update profile.");
            }
        });
    };

    return (
        <div className="container py-4">
            <h3 className="fw-bold text-dark mb-4">Edit Profile</h3>

            {loader ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                    <BallTriangle height={100} width={100} color="#4fa94d" visible />
                </div>
            ) : (
                <div className="card shadow-sm p-4 rounded-4 mx-auto" style={{ maxWidth: "800px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">First Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                                    placeholder="Enter first name"
                                    {...register("firstname", { required: "First name is required" })}
                                />
                                {errors.firstname && (
                                    <div className="invalid-feedback">{errors.firstname.message}</div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Last Name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                                    placeholder="Enter last name"
                                    {...register("lastname", { required: "Last name is required" })}
                                />
                                {errors.lastname && (
                                    <div className="invalid-feedback">{errors.lastname.message}</div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    placeholder="Enter email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Country Code</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.country_code ? "is-invalid" : ""}`}
                                    placeholder="+91"
                                    {...register("country_code", { required: "Country code required" })}
                                />
                                {errors.country_code && (
                                    <div className="invalid-feedback">{errors.country_code.message}</div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label fw-semibold">Mobile Number</label>
                                <input
                                    type="tel"
                                    className={`form-control ${errors.mobile_number ? "is-invalid" : ""}`}
                                    placeholder="Enter mobile number"
                                    {...register("mobile_number", {
                                        required: "Mobile number required",
                                        pattern: {
                                            value: /^[0-9]{6,15}$/,
                                            message: "Enter valid mobile number",
                                        },
                                    })}
                                />
                                {errors.mobile_number && (
                                    <div className="invalid-feedback">{errors.mobile_number.message}</div>
                                )}
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button type="submit" className="btn btn-dark px-4 fw-semibold" disabled={loading}>
                                {loading ? "Updating..." : "Update Profile"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
