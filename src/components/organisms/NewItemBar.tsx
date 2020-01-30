import React from 'react';
import styled from 'styled-components';
import Heading from '../atoms/Heading';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { addHabit } from '../../actions';
import event, { Events } from 'services/eventHandler'

const StyledWrapper = styled.div`
  border-left: 10px solid ${({theme}) => theme.paletteBlue.main};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 30px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 600px;
  background-color: ${({theme}) => theme.paletteBlue.bgc};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({isVisible}) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
`;

const StyledTextArea = styled(Input)`
  border-radius: 20px;
  height: 30vh;
`;

const StyledForm = styled(Form)`
display: flex;
  flex-direction: column;
`;

const NewItemBar = ({isVisible, addHabit, handleClose}) => (
    <StyledWrapper isVisible={isVisible}>
      <Heading big>Create new Habit</Heading>
      <Formik
          initialValues={{content: ''}}
          onSubmit={(values, {resetForm}) => {
            addHabit(values.content);
            handleClose();
            resetForm({});
            console.log(event);
            event.subscribe(Events.ONE, (() => console.log('kappa')));
            console.log(event);
          }}
      >
        {({values, handleChange, handleBlur}) => (
            <StyledForm>
              <StyledTextArea
                  name="content"
                  as="textarea"
                  placeholder="Your habit content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}/>
              <Button type="submit">Add Habit</Button>
            </StyledForm>
        )}
      </Formik>
    </StyledWrapper>
);


export default connect(null, {addHabit})(NewItemBar);
