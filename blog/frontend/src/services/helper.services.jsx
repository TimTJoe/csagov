const helpers = {}
helpers.get = {}
helpers.get.apiUrl = () => {
    return import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
    return
}


function getAPIURL() {
    return import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_API_URL : import.meta.env.VITE_DEV_API_URL;
    return
}

export function formatDate(date) {
    let _date = new Date(date);
    let formatedDate = new Intl.DateTimeFormat("us-EN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(_date);
  
    return formatedDate;
  }
  

export default {getAPIURL, helpers, formatDate}