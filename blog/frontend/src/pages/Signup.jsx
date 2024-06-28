import { Button, Slider, Input } from '@nextui-org/react';
import styled from "styled-components"

const Main = styled.main`
    width: 100%;
    height:100vh ;
    display: grid;
    place-items: center;
    place-content: center;
    gap: 23px;
    border: solid red;
`

const Formbox = styled.form`
    width: 450px;
    background-color: white;
    min-height: 250px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Signup = () => {
    return (
        <Main>
            <h1>Create New Account {apiUrl}</h1>
            <Formbox method='post'>
                <Input size='lg' type='text' name={"firstname"} placeholder='First Name' />
                <Input size='lg' type='text' name={"lastname"} placeholder='Last Name' />
                <Input size='lg' type='text' name={"email"} placeholder='Email  ' />
                <Input size='lg' type='password' name={"password"} placeholder='********' />
                <Button size='lg' color='primary'>Create Account</Button>
            </Formbox>
        </Main>
    );
}

export default Signup;
