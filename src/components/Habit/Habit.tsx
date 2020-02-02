import React, {Component} from 'react';
import HabitCreator from "../HabitCreator/HabitCreator";
import {HabitItem} from "../../shared/models";
import {deleteHabit} from "../../services/habit-service";
import {formatDate} from "../../shared/utils";
import {selectHabit} from "../../redux/actions";
import {connect} from 'react-redux';
import styled, {css} from 'styled-components';
import Button from "../atoms/Button";
import ButtonWrapper from "../atoms/ButtonWrapper";
import EventHandler, {EventType} from 'services/eventHandler'

export interface HabitProps {
    habit: HabitItem
    reloadHabits: () => void
    selectHabit: (habitId) => void
    goUp: () => void
    goDown: () => void
    selectedHabit: number
    lastCheckDate: string
}

interface HabitState {
    editMode: boolean
    lastCheckedDay: Date
}

const Wrapper = styled.div`
  padding: .5rem;
  border: 1px solid ${({theme}) => theme.paletteBlue.text1};
  &:nth-child(n+2) {
  border-top: none;
  }
  &:hover {
    background-color: ${({theme}) => theme.paletteBlue.text1};
    cursor: pointer;
  }

  ${({isSelected, theme}) =>
    isSelected &&
    css`
      background-color: ${theme.paletteBlue.main};
    `}

   ${({isChecked}) =>
    isChecked &&
    css`
      background-color: #33aa55;
      &:hover {
        background-color: lightgreen;
      }
    `}
`;

class Habit extends Component<HabitProps, HabitState> {

    currentDateFormatted = formatDate(new Date());

    state = {
        editMode: false,
        lastCheckedDay: null
    };

    handleEditClick = () => {
        // this.toggleEditMode();
        EventHandler.emit(EventType.EDIT_HABIT, this.props.habit);
    };

    handleHabitUpdated = () => {
        this.props.reloadHabits();
        this.toggleEditMode();
    };

    public render() {
        const {lastCheckDate} = this.props;
        const isSelected = this.props.habit.id === this.props.selectedHabit;
        const isChecked = lastCheckDate === this.currentDateFormatted;
        return (
            <Wrapper isSelected={isSelected} isChecked={isChecked}
                     onClick={this.props.selectHabit.bind(this.props, this.props.habit.id)}>
                <div>
                    <p>{this.props.habit.content}</p>
                    <p>{lastCheckDate ? lastCheckDate : 'never'}</p>
                    <ButtonWrapper>
                        <Button bgc={'red'} onClick={this.handleEditClick}>Edit</Button>
                        <Button disabled={true} onClick={this.handleDelete}>delete</Button>
                        <Button onClick={this.props.goUp}>go up</Button>
                        <Button onClick={this.props.goDown}>go down</Button>
                    </ButtonWrapper>
                </div>
                {this.state.editMode &&
                <HabitCreator onHabitSubmitted={this.handleHabitUpdated} habit={this.props.habit}/>}
            </Wrapper>
        );
    }

    private toggleEditMode = () => {
        this.setState((prevState) => ({
            editMode: !prevState.editMode
        }))
    };

    private handleDelete = () => {
        deleteHabit(this.props.habit.id).then(this.props.reloadHabits);
    };
}

const mapStateToProps = ({habits: {selectedHabit}}) => ({selectedHabit});

export default connect(mapStateToProps, {selectHabit})(Habit);