import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useFetchAndDispatch = (url, actionCreator) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                dispatch(actionCreator(response.data));
            } catch (err) {
                console.error('Failed to fetch data', err);
            }
        };

        fetchData();
    }, [url, dispatch, actionCreator]);
};

export default useFetchAndDispatch;
