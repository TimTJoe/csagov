import { useForm } from "react-hook-form";
import { Main, Form, FormContainer } from "./signup.comp";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Pattern from "@components/Pattern";
import userServices from "@services/user.services";

const SignupPage = () => {
    const goto = useNavigate()

    const [loading, setLoading] = useState(false)

    const {
        control,
        setError,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleErrors = (errors) => { console.error(errors) };

    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    async function handleSave() {
        setLoading(true)
        try {
            let res = await userServices.signup(values)
            if (res.status == "201") {
                setLoading(false)
                goto("/signin")
            } else {
                throw new Error({ message: "status error" })
            }
        } catch (error) {
            setError("server", {
                error,
                type: "custom",
                message: "Technical Error. Try again.",
            });
        }
    }

    const classes = "field label round fill border large"


    return (
        <>
            <header>
                <nav>
                    <h5 className="max">CSA Blog</h5>
                    <button className="border no-elevate large">Log in</button>
                </nav>
            </header>
            <Main className="responsive grid">
                <div className="s12 m8 8 padding">
                    <h2>Create New Account</h2>
                    <p className="large-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta nulla a odio illum voluptas doloribus repellat esse voluptatem maiores nam voluptatibus at, cupiditate animi doloremque, sit itaque! Itaque, a corrupti!</p>
                </div>
                <FormContainer className="s12 m4 4 border round">
                    <h5>Sign up</h5>
                    <p className="large-text">To start blogging.</p>
                    {loading && <progress></progress>}
                    <Form
                        onSubmit={handleSubmit(handleSave, handleErrors)}
                        autoComplete="off"
                    >
                        <div className={`${classes} ${errors.firstname && "invalid"}`}>
                            <input
                                required
                                type="text"
                                value={values.firstname}
                                {...register("firstname", Pattern.title)}
                                onChange={handleChange}
                            />
                            <label>First name</label>
                            {
                                errors.firstname ? <span className="error">{errors.firstname.message}</span> : null
                            }
                        </div>
                        <div className={`${classes} ${errors.lastname && "invalid"}`}>
                            <input
                                required
                                type="text"
                                value={values.lastname}
                                {...register("lastname", Pattern.title)}
                                onChange={handleChange}
                            />
                            <label>Last name</label>
                            {
                                errors.lastname ? <span className="error">{errors.lastname.message}</span> : null
                            }
                        </div>
                        <div className={`${classes} ${errors.email && "invalid"}`}>
                            <input
                                required
                                type="email"
                                value={values.email}
                                {...register("email", Pattern.email)}
                                onChange={handleChange}
                            />
                            <label>Email</label>
                            {
                                errors.email ? <span className="error">{errors.email.message}</span> : null
                            }
                        </div>
                        <div className={`${classes} ${errors.password && "invalid"}`}>
                            <input
                                required
                                type="password"
                                value={values.password}
                                {...register("password", Pattern.password)}
                                onChange={handleChange}
                            />
                            <label >Password</label>
                            {
                                errors.password ? <span className="error">{errors.password.message}</span> : null
                            }
                        </div>
                        <button type="submit" className="responsive round large no-elevate">Create Account</button>
                    </Form>
                </FormContainer>
            </Main>
        </>
    );
}

export default SignupPage;