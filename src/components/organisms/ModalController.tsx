import React, {Component} from 'react';
import NewItemBar from "./NewItemBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styled, {css} from 'styled-components';
import EventHandler, {EventType} from "../../services/eventHandler";
import {HabitItem} from "../../shared/models";
import { BaseButton } from '../atoms/Button';

const StyledButtonIcon = styled(BaseButton)`
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
      transform: rotate(0deg);
    `};
  
  &:hover {
  cursor: pointer;
  }
`;

interface ModalControllerState {
    modalVisible: boolean
    currentHabit: HabitItem
}

class ModalController extends Component<{}, ModalControllerState> {
    subscriptions  =[];
    state = {
        modalVisible: false,
        currentHabit: null
    };


    componentDidMount(): void {
        this.subscribeToModalEvents();
    }

    handleModalToggle = () => {
        if (this.state.modalVisible) {
            this.setState({currentHabit: null});
        }
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible,
        }));
    };

    subscribeToModalEvents = () => {
        const subscriptionId = EventHandler.subscribe(EventType.EDIT_HABIT, currentHabit => {
            if (!this.state.currentHabit) {
                this.setState({currentHabit});
                this.handleModalToggle();
            }
        });
        this.subscriptions.push(subscriptionId);
    };

    render() {
        return (
            <>
                <NewItemBar currentHabit={this.state.currentHabit} handleClose={this.handleModalToggle} isVisible={this.state.modalVisible}/>
                <StyledButtonIcon rotate={this.state.modalVisible ? 1 : 0} onClick={this.handleModalToggle}>
                    <FontAwesomeIcon icon={faTimes}/>
                </StyledButtonIcon>
            </>
        );
    }

    componentWillUnmount(): void {
        this.subscriptions.forEach(subscription => {
            EventHandler.unsubscribe(EventType.EDIT_HABIT, subscription);
        })
    }
}

export default ModalController;
