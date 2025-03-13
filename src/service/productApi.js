import axios from "@/plugins/axios";

const getProductList = async ({limit, skip}) => {
    return await axios.get(`?limit=${limit}&skip=${skip}`);
}

export default {getProductList}
