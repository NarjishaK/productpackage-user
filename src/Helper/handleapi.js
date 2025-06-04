import axios from "axios";
export const BASE_URL ="http://localhost:3001";
// export const BASE_URL ="https://api.sstappstore.in";

//best selling packages
export const fetchBestsellingPackages = async () => {
  const response = await axios.get(`${BASE_URL}/customerorder/bestselling-packages`);
  return response.data;
}

//get order by customerId
export const fetchOrders = async (customerId) => {
    const response = await axios.get(`${BASE_URL}/customerorder/${customerId}`);
    return response.data;
}

//create order

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${BASE_URL}/customerorder/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
//getPackageWithProducts
export const fetchPackageWithProducts = async (packageId) => {
  try {
    const response = await axios.get(`${BASE_URL}/subcategory/package/${packageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching package with products:', error);
    throw error;
  }
};
//package by id
export const fetchPackageById = async (id) => {
    const response = await axios.get(`${BASE_URL}/subcategory/${id}`);
    return response.data;
}

//cartitems by customerId

export const fetchCartItems = async (customerId) => {
    const response = await axios.get(`${BASE_URL}/customercart/${customerId}`);
    return response.data;
}

//signin
export const loginCustomer = async (admin) => {
    const response = await axios.post(`${BASE_URL}/customer/login`, admin);
    return response.data;
};

//signup
export const Customersignup = async (data) => {
    const response = await axios.post(`${BASE_URL}/customer`, data);
    return response.data;
}

//fetch all products
export const fetchPackages = async () => {
     const response = await axios.get(`${BASE_URL}/subcategory`);
    return response.data.filter(pkg => pkg.isActive); // filter only active packages

}

//fetch all banners
export const fetchBanners = async () => {
    const response = await axios.get(`${BASE_URL}/banner`);
    return response.data;
}

//fetch logo
export const fetchLogo = async () => {
    const response = await axios.get(`${BASE_URL}/logo`);
    return response.data;
}

//fetch all products
export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/product`);
    return response.data;
}


//fetch All Package with all Products and categories and vendor details
export const fetchAllPackageswithProducts = async () => {
    const response = await axios.get(`${BASE_URL}/subcategory/allpackage`);
    return response.data;
}