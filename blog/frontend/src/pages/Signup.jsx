import { Main, Formbox } from "./signup/signup.comp";
import { useState } from 'react';

import userServices from "../services/user.services";


const Signup = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        userServices.getUser()
        e.preventDefault();
        // try {
        //     userServices.signup(formData);
        //     setSuccess(true);
        //     setError(null);
        // } catch (error) {
        //     setError(error.response?.data.error);
        //     setSuccess(false);
        // }
    };



    return (
        <Main>
            <h1>Create New Account </h1>
            <Formbox onSubmit={handleSubmit} method='post'>
                <Input onChange={handleChange} value={formData.firstname} size='lg' type='text' name={"firstname"} placeholder='First Name' />
                <Input onChange={handleChange} value={formData.lastname} size='lg' type='text' name={"lastname"} placeholder='Last Name' />
                <Input onChange={handleChange} value={formData.email} size='lg' type='text' name={"email"} placeholder='Email  ' />
                <Input onChange={handleChange} value={formData.password} size='lg' type='password' name={"password"} placeholder='********' />
                <Button type='submit' size='lg' color='primary'>Create Account</Button>
            </Formbox>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Registration successful!</p>}
        </Main>
    );
}

export default Signup;
