import axios from "axios";
export const BASE_URL ="http://localhost:3000";


//fetch all products
export const fetchPackages = async () => {
    const response = await axios.get(`${BASE_URL}/subcategory`);
    return response.data;
}