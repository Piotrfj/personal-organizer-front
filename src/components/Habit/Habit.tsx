import React, {Component} from 'react';
import './Habit.scss';
import HabitCreator from "../HabitCreator/HabitCreator";
import {HabitItem} from "../../models";
import {deleteHabit} from "../../services/habit-service";

export interface HabitProps {
    habit: HabitItem
    isSelected: boolean
    reloadHabits: () => void
    selectHabitFunction: (habitId) => void
}

interface HabitState {
    editMode: boolean
}

export default class Habit extends Component<HabitProps, HabitState> {

    state = {
        editMode: false
    };

    handleEditClick = () => {
        this.toggleEditMode();
    };

    handleHabitUpdated = () => {
     this.props.reloadHabits();
     this.toggleEditMode();
    };

    public render() {
        return (
            <div className={`habit${this.props.isSelected ? ' habit--selected' : ''}`} onClick={this.props.selectHabitFunction.bind(this.props, this.props.habit.id)}>
                <div>
                    <p>{this.props.habit.content}</p>
                    <button onClick={this.handleEditClick}>Edit</button>
                    <button disabled={true} onClick={this.handleDelete}>delete</button>
                </div>
                {this.state.editMode && <HabitCreator onHabitSubmitted={this.handleHabitUpdated} habit={this.props.habit}/>}
            </div>
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
