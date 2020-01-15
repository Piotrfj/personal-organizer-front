import React, {Component} from 'react';
import './Habit.scss';
import HabitCreator from "../HabitCreator/HabitCreator";
import {HabitItem, HabitLog} from "../../models";
import {deleteHabit, getLog} from "../../services/habit-service";
import {AxiosResponse} from "axios";
import {formatDate} from "../../utils";

export interface HabitProps {
    habit: HabitItem
    isSelected: boolean
    reloadHabits: () => void
    selectHabitFunction: (habitId) => void
    goUp: () => void
    goDown: () => void
}

interface HabitState {
    editMode: boolean
    lastCheckedDay: Date
}

export default class Habit extends Component<HabitProps, HabitState> {

    currentDateFormatted = formatDate(new Date());

    state = {
        editMode: false,
        lastCheckedDay: null
    };

    componentDidMount(): void {
        this.setLastCheckedDay();
    }

    setLastCheckedDay() {
        this.getLastCheckedDay().then(lastCheckedDay => {
            this.setState({lastCheckedDay})
        })
    }

    getLastCheckedDay = () => {
        return getLog(this.props.habit.id).then((log: AxiosResponse<HabitLog[]>) => {
            return log.data;
        }).then((habitLogs) => {
            const lastCheckDay = habitLogs.sort((a,b) => {
                if (a.date > b.date) return 1;
                else return -1;
            }).filter(habitLog => habitLog.date <= this.currentDateFormatted).pop();
            return lastCheckDay ? new Date(lastCheckDay.date) : null;
        })
    };

    handleEditClick = () => {
        this.toggleEditMode();
    };

    handleHabitUpdated = () => {
        this.props.reloadHabits();
        this.toggleEditMode();
    };

    public render() {
        const {lastCheckedDay} = this.state;
        return (
            <div className={`habit${this.props.isSelected ? ' habit--selected' : ''}${formatDate(lastCheckedDay) === this.currentDateFormatted ? ' habit--checked' : ''}`}
                 onClick={this.props.selectHabitFunction.bind(this.props, this.props.habit.id)}>
                <div>
                    <p>{this.props.habit.content}</p>
                    <button onClick={this.handleEditClick}>Edit</button>
                    <button disabled={false} onClick={this.handleDelete}>delete</button>
                    <button onClick={this.props.goUp}>go up</button>
                    <button onClick={this.props.goDown}>go down</button>
                    <p>{lastCheckedDay ? lastCheckedDay.getDate() : 'never'}</p>
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
