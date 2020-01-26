import React, {Component} from 'react';
import './Habit.scss';
import HabitCreator from "../HabitCreator/HabitCreator";
import {HabitItem} from "../../models";
import {deleteHabit} from "../../services/habit-service";
import {formatDate} from "../../utils";
import {selectHabit} from "../../actions";
import {connect} from 'react-redux';

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

class Habit extends Component<HabitProps, HabitState> {

    currentDateFormatted = formatDate(new Date());

    state = {
        editMode: false,
        lastCheckedDay: null
    };

    handleEditClick = () => {
        this.toggleEditMode();
    };

    handleHabitUpdated = () => {
        this.props.reloadHabits();
        this.toggleEditMode();
    };

    public render() {
        const {lastCheckDate} = this.props;
        const isSelected = this.props.habit.id === this.props.selectedHabit;
        return (
            <div className={`habit${isSelected ? ' habit--selected' : ''}${lastCheckDate === this.currentDateFormatted ? ' habit--checked' : ''}`}
                 onClick={this.props.selectHabit.bind(this.props, this.props.habit.id)}>
                <div>
                    <p>{this.props.habit.content}</p>
                    <button onClick={this.handleEditClick}>Edit</button>
                    <button disabled={false} onClick={this.handleDelete}>delete</button>
                    <button onClick={this.props.goUp}>go up</button>
                    <button onClick={this.props.goDown}>go down</button>
                    <p>{lastCheckDate ? lastCheckDate : 'never'}</p>
                </div>
                {this.state.editMode &&
                <HabitCreator onHabitSubmitted={this.handleHabitUpdated} habit={this.props.habit}/>}
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

const mapStateToProps = ({ habits: { selectedHabit } }) => ({ selectedHabit });

export default connect(mapStateToProps, { selectHabit })(Habit);