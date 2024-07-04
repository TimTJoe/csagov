import { useEffect, useState } from 'react';

const useApiUrl = () => {
    const [apiUrl, setApiUrl] = useState('');

    useEffect(() => {
        if (import.meta.env.VITE_NODE_ENV === 'production') {
            setApiUrl(import.meta.env.VITE_API_URL);
        } else {
            setApiUrl(import.meta.env.VITE_DEV_API_URL);
        }
    }, []);

    return apiUrl;
};

export default useApiUrl;
