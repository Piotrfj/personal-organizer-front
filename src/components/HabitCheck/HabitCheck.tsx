import React, {Component} from 'react';
import './HabitCheck.scss'
import {HabitLogType} from "../../model-enum";
import * as HabitService from '../../services/habit-service'

interface HabitCheckProps {
    habitId: number
    date: string
    onCheck: () => void
    turnOffCheckMode: () => void
}

class HabitCheck extends Component<HabitCheckProps> {

    handleClick(check: HabitLogType) {
        const {habitId, date} = this.props;
        return () => {
            this.props.turnOffCheckMode();
            HabitService.checkHabit(habitId, date, check)
                .then(() => this.props.onCheck());
        }
    };

    render() {
        return (
            <div className={'habit-check'}>
                <button onClick={this.handleClick(HabitLogType.DOESNT_COUNT)} className={'habit-check__button'}>not today</button>
                <button onClick={this.handleClick(HabitLogType.FAIL)} className={'habit-check__button'}>failed</button>
                <button onClick={this.handleClick(HabitLogType.PARTIALLY)} className={'habit-check__button'}>partially</button>
                <button onClick={this.handleClick(HabitLogType.SUCCESS)} className={'habit-check__button'}>perfectly</button>
            </div>
        );
    }
}

export default HabitCheck;