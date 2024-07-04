import axios from "axios"

import helperServices from "./helper.services";
import localdbServices from "./localdb.services";

const API_URL = helperServices.getAPIURL()

const initializer = async () => {
    const response = await axios.get(`${API_URL}`)
    return response
}

export default { initializer }