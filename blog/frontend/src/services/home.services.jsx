import axios from "axios"

import helperServices from "./helper.services";
import localdbServices from "./localdb.services";

const API_URL = helperServices.getAPIURL()

const initializer = async () => {
    const response = await axios.get(`${API_URL}`)
    return response
}

function logout() {
    localdbServices.deleteItem("user")
    return true
}

export default { initializer, logout }