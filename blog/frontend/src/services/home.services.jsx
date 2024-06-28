import axios from "axios"
import helpers from "./helper.services"

const API_URL = helpers.get.apiUrl()

const initializer = async () => {
    const response = await axios.get(`${API_URL}`)
    return response
}

export default { initializer }