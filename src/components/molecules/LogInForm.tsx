import React, {Component} from 'react';
import styled from 'styled-components';
import {Form, Formik} from 'formik';
import {ConvexButton} from '../atoms/Button';
import {boxShadow} from '../../theme/mixins';
import Input from '../atoms/Input';
import ButtonWrapper from '../atoms/ButtonWrapper';
import {connect} from 'react-redux';
import {loginAction, tryDemo} from '../../redux/actions';

const StyledForm = styled(Form)`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-rows: 1fr auto auto 1fr;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  padding: 20px 50px;
  transform: translate(-50%, -100%);
  background-color: ${props => props.theme.paletteBlue.text1};
  border-radius: 20px;
  border: 3px solid ${props => props.theme.paletteBlue.main};
  ${boxShadow()}
`;

const Wrapper = styled.div`
  z-index: 10001;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  backdrop-filter: blur(2px) contrast(90%);
`;

const StyledButton = styled(ConvexButton)`
  justify-self: right;
`;

class LogInForm extends Component<{ isLoadingModalOpen, login, tryDemo }> {

    handleDemoClick = () => {
        this.props.tryDemo();
    };

    render() {
        return this.props.isLoadingModalOpen ?
            <Wrapper>
                <Formik
                    initialValues={{email: '', password: ''}}
                    onSubmit={(values, {resetForm}) => {
                        this.props.login(values.email, values.password);
                        resetForm({});
                    }}>
                    {({values, handleChange, handleBlur}) => (
                        <StyledForm>
                            <h1>Login</h1>
                            <Input type="text"
                                   name="email"
                                   placeholder="email"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.email}/>
                            <Input type="password"
                                   name="password"
                                   placeholder="password"
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.password}/>
                            <ButtonWrapper>
                                <StyledButton type="button" onClick={this.handleDemoClick}>try demo</StyledButton>
                                <StyledButton type="submit">Login</StyledButton>
                            </ButtonWrapper>

                        </StyledForm>
                    )}
                </Formik>
            </Wrapper>
            :
            <></>;
    }
}

const mapStateToProps = ({app: {isLoadingModalOpen}}) => ({isLoadingModalOpen});

export default connect(mapStateToProps, {login: loginAction, tryDemo})(LogInForm);
