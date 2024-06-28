import { useState } from 'react';
import axios from 'axios';

const useSubmitForm = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const submitForm = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post(url, data);
            setResponse(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, submitForm };
};

export default useSubmitForm;
