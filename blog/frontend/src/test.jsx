import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import useApiUrl from './hooks/useApiUrl';
import useSubmitForm from './hooks/useSubmitForm';
import useFetchAndDispatch from './hooks/useFetchAndDispatch';
import { setData } from './actions';

const App = () => {
    const apiUrl = useApiUrl();
    const { response, error, loading, submitForm } = useSubmitForm(`${apiUrl}/submit`);
    useFetchAndDispatch(`${apiUrl}/data`, setData);
    const data = useSelector(state => state.data);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        submitForm(Object.fromEntries(formData));
    };

    return (
        <Provider store={store}>
            <div>
                <form onSubmit={handleSubmit}>
                    <input name="name" type="text" placeholder="Name" required />
                    <button type="submit">Submit</button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {response && <p>Response: {JSON.stringify(response)}</p>}
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </Provider>
    );
};

export default App;
