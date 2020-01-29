import React, {Component} from 'react';
import HabitList from '../../components/HabitList/HabitList';
import HabitDetails from './HabitDetails';
import {connect} from 'react-redux';
import {loadHabits, loadLastCheckLog, selectHabit} from 'actions'
import styled, {css} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import NewItemBar from "../../components/organisms/NewItemBar";

const StyledWrapper = styled.div`
  position: relative;
  background-color: ${({theme}) => theme.paletteBlue.bgc};
  color: ${({theme}) => theme.paletteBlue.text3};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 10px;
  height: 100vh;
  padding: 1rem;
`;


const StyledButtonIcon = styled.button`
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  width: 50px;
  height: 50px;
  ${({theme}) => css`
    background-color: ${theme.paletteBlue.main};
    color: ${theme.paletteBlue.text3};
  `};
  border: none;
  border-radius: 50%;
  z-index: 10000;
  transform: rotate(45deg);
  transition: transform .1s;
  ${({rotate}) =>
    rotate &&
    css`
      transform: rotate(0);
    `}
  
  &:focus {
  outline: none;
  }
  &:hover {
  cursor: pointer;
  }
`;

interface HabitViewState {
    modalVisible: boolean
}

class HabitView extends Component<{ selectHabit, loadHabits, habits, loadLastCheckLog }, HabitViewState> {

    state = {
        modalVisible: false
    };

    componentDidMount(): void {
        this.props.loadHabits();
        this.props.loadLastCheckLog();
    }

    handleModalToggle = () => {
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible,
        }));
    };

    render() {
        return (
            <StyledWrapper>
                <HabitList/>
                <HabitDetails/>
                <NewItemBar isVisible={this.state.modalVisible}/>
                <StyledButtonIcon rotate={this.state.modalVisible} onClick={this.handleModalToggle}>
                    <FontAwesomeIcon icon={faTimes}/>
                </StyledButtonIcon>
            </StyledWrapper>
        );
    }
}

const mapStateToProps = ({habits: {items}}) => ({items});

export default connect(mapStateToProps, {loadHabits, selectHabit, loadLastCheckLog})(HabitView);