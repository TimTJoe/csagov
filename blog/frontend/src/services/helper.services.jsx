const helpers = {}
helpers.get = {}
helpers.get.apiUrl = () => {
    return import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
    return
}

export default helpers