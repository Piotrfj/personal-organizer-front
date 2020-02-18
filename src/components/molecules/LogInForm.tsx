import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import {Form, Formik} from "formik";
import {logIn} from "../../services/habit-service";
import Button from "../atoms/Button";

const Wrapper = styled.div`
  display: grid;  
`;

const StyledForm = styled(Form)`
display: flex;
  flex-direction: column;
`;

class LogInForm extends Component {
    render() {
        return (
            <Wrapper>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {resetForm}) => {
                        logIn(values.email, values.password)
                            .then(() => console.log('oke'));
                        resetForm({});
                    }}>
                    {({values, handleChange, handleBlur}) => (
                        <StyledForm>
                            <input type="text"
                                   name="email"
                                   placeholder="email"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.email}/>
                            <input type="text"
                                   name="password"
                                   placeholder="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}/>
                            <Button type="submit">LogIn</Button>
                        </StyledForm>
                    )}
                </Formik>
            </Wrapper>
        );
    }
}

export default LogInForm;