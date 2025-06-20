import React from "react";
import { useForm } from "react-hook-form";

const EditProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            countryCode: "+91",
            mobileNumber: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Profile Data:", data);
        alert("Profile updated successfully!");
        // You can dispatch to Redux or call API here
    };

    return (
        <div className="container-fluid">
            <h2 className="fw-bold mb-4 text-dark">Edit Profile</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card shadow-sm p-4 rounded"
            >
                <div className="row g-5">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">First Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.firstName ? "is-invalid" : ""
                                }`}
                            {...register("firstName", { required: "First name is required" })}
                            placeholder="Enter first name"
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback">{errors.firstName.message}</div>
                        )}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Last Name</label>
                        <input
                            type="text"
                            className={`form-control ${errors.lastName ? "is-invalid" : ""
                                }`}
                            {...register("lastName", { required: "Last name is required" })}
                            placeholder="Enter last name"
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback">{errors.lastName.message}</div>
                        )}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                    </div>

                    <div className="col-md-2">
                        <label className="form-label fw-semibold">Country Code</label>
                        <input
                            type="text"
                            className={`form-control ${errors.countryCode ? "is-invalid" : ""
                                }`}
                            {...register("countryCode", {
                                required: "Country code required"
                            })}
                            placeholder="+91"
                        />
                        {errors.countryCode && (
                            <div className="invalid-feedback">
                                {errors.countryCode.message}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-semibold">Mobile Number</label>
                        <input
                            type="tel"
                            className={`form-control ${errors.mobileNumber ? "is-invalid" : ""
                                }`}
                            {...register("mobileNumber", {
                                required: "Mobile number required",
                                pattern: {
                                    value: /^[0-9]{6,15}$/,
                                    message: "Enter valid mobile number"
                                }
                            })}
                            placeholder="Enter mobile number"
                        />
                        {errors.mobileNumber && (
                            <div className="invalid-feedback">
                                {errors.mobileNumber.message}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-dark mt-4 w-10 fw-bold"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
