import axios from "axios"
import React from 'react';

import helpers from "./helper.services"
import useApiUrl from "@hooks/useApiUrl";
import helperServices from "./helper.services";

const API_URL = helperServices.getAPIURL()

const initializer = async () => {
    const response = await axios.get(`${API_URL}`)
    return response
}

export default { initializer }