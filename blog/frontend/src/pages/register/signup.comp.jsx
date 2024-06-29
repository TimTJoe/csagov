import styled from "styled-components";

export const Main = styled.main`
    > * {
        &:first-child {
            display: grid;
            place-content: center;
        }
    }
`
export const FormContainer = styled.div`
margin: 12px;
padding: 8px;
width: 95%;
`
export const Form = styled.form`
`