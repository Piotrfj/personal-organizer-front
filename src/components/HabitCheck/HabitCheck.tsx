import React, {Component} from 'react';
import './HabitCheck.scss'
import {HabitLogType} from "../../model-enum";
import * as HabitService from '../../services/habit-service'
import { connect } from 'react-redux';
import {checkHabit} from "../../actions";

interface HabitCheckProps {
    selectedHabit: number
    date: string
    onCheck: () => void
    logId?: number
    checkHabit
}

class HabitCheck extends Component<HabitCheckProps> {

    handleClick(check: HabitLogType) {
        const {logId, selectedHabit, date} = this.props;
        return () => {
            (this.props.logId ?
                HabitService.updateHabitLog(logId,selectedHabit,date,check) :
                this.props.checkHabit(selectedHabit, date, check))
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

const mapStateToProps = ({ habits: { selectedHabit } }) => ({ selectedHabit });

export default connect(mapStateToProps, { checkHabit })(HabitCheck);