import axios from "axios";
export const BASE_URL ="http://localhost:3000";


//fetch all products
export const fetchPackages = async () => {
    const response = await axios.get(`${BASE_URL}/subcategory`);
    return response.data;
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