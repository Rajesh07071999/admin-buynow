import { axiosClient } from "./apiClinet";


export const login = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/login`, data.data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const changePassword = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/login`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const adminDetails = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/adminDetails`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const editProfile = async (data) => {
    
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/editProfile`, data.data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const logout = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/logout`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const dashboard = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/dashbaord`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const userList = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/userList`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const userDetails = async (data) => {
    console.log(data)
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/userDetails`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

// Product

export const productListing = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/products/productListing`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const addProduct = async (data) => {
    console.log("dtaa",data);
    
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/products/addProducts`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const editProduct = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/products/editProduct`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const deleteProduct = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/products/deleteProduct`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
//cart
export const cartListing = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/cart/cartLisitng`, data);
        return response;
    } catch (error) {
        throw error;
    }
};


//order


export const orderListing = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/order/orderListing`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const orderUpdateStatas = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/order/orderUpdateStatas`, data);
        return response;
    } catch (error) {
        throw error;
    }
};

//user
export const userChangeStatus = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/ChangeActiveStatus`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
export const deleteUser = async (data) => {
    try {
        const response = await axiosClient.post(`${process.env.REACT_APP_BASE_URL}admin/auth/deleteUser`, data);
        return response;
    } catch (error) {
        throw error;
    }
};
