function getApiUrl() {
  const isProduction = process.env.meta.VITE_NODE_ENV === "production";
  if (isProduction) {
    return process.env.meta.API_URL;
  } else {
    return process.env.meta.DEV_API_URL;
  }
}

export default getApiUrl;
