import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Pattern from "@components/Pattern";
import userServices from "@services/user.services";


const SigninPage = () => {
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
            let res = await userServices.login(values)
            if (res.status == "201") {
                setLoading(false)
                goto("/home")
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
        <main className="responsive center-align " style={
            {
                display: "grid",
                alignItems: "center",
            }}>
            <div className="border round padding" style={{
                width: "450px",
                minHeight: "275px"
            }}>
                <h5 className="center-align">Sign into your account</h5>
                <div className="space"></div>
                {loading && <progress></progress>}
                <form
                    onSubmit={handleSubmit(handleSave, handleErrors)}
                    autoComplete="off"
                    className="left-align"
                >

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
                    <a href="find-account">Forget Password? </a>
                    <div className="space"></div>
                    <button type="submit" className="responsive round large no-elevate">Sign in</button>
                </form>
                <p>Don't have an account? <a href="signup">Create New Account</a></p>
            </div>
        </main>
    );
}

export default SigninPage;