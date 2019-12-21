import React, {Component} from 'react';
import axios, {AxiosResponse} from "axios";
import {apiUrl} from '../../config'
import './Calendar.scss'
import CalendarCell from "./CalendarCell";
import {HabitLog} from "../../models";
import {HabitLogType} from "../../model-enum";

interface CalendarState {
    currentMonth: number;
    currentMonthChecks: HabitLogType[]
}

interface CalendarProps {
    selectedHabit: number;
}

class Calendar extends Component<CalendarProps, CalendarState> {

    readonly currentDate = new Date();

    state = {
        currentMonth: new Date().getMonth() + 1,
        currentMonthChecks: [],
    };

    constructor(props: CalendarProps) {
        super(props);
        this.requestLog();
    }

    render() {
        return (
            <div className="calendar">
                {this.getPreviousMonthFillingDays()}
                {this.getDays()}
                {this.getFollowingMonthFillingDays()}
            </div>
        );
    }

    private requestLog() {
        axios.get(`${apiUrl}/log/${this.props.selectedHabit}`)
            .then((habitLog: AxiosResponse<HabitLog[]>) => {
                this.setState({currentMonthChecks: this.getHabitLogTypesForCurrentMonth(habitLog.data)});
            });
    }

    private getDays = () => this.state.currentMonthChecks.map((el, i) => <CalendarCell dayNumber={i + 1} type={el}/>);

    private getPreviousMonthFillingDays(): JSX.Element[] {
        const daysAmountInPreviousMonth = this.getDaysAmountInMonth(this.state.currentMonth - 1);
        const daysToFill = this.getFirstMonthDayAsWeekDay() - 1;
        const PreviousMonthDaysAsCells = [];
        for (let i = daysAmountInPreviousMonth - daysToFill + 1; i <= this.getDaysAmountInMonth(this.state.currentMonth - 1); i++)
            PreviousMonthDaysAsCells.push(<CalendarCell dayNumber={i} type={HabitLogType.EMPTY}/>);
        return PreviousMonthDaysAsCells;
    }

    private getFollowingMonthFillingDays(): JSX.Element[] {
        const daysToFill = 7 - ((this.getFirstMonthDayAsWeekDay() + this.getDaysAmountInMonth() - 1) % 7);
        const FollowingMonthDaysAsCells = [];
        for (let i = 1; i <= daysToFill; i++) FollowingMonthDaysAsCells.push(<CalendarCell dayNumber={i}
                                                                                           type={HabitLogType.EMPTY}/>);
        return FollowingMonthDaysAsCells;
    }

    private getHabitLogTypesForCurrentMonth(habitLogs: HabitLog[]): HabitLogType[] {
        const habitLogTypes: HabitLogType[] = [];
        for (let i = 1; i <= this.getDaysAmountInMonth(this.state.currentMonth); i++) {
            habitLogTypes.push(HabitLogType.EMPTY)
        }
        habitLogs.filter(habitLog => new Date(habitLog.date).getMonth() + 1 === this.state.currentMonth).forEach((habitLog) => {
            habitLogTypes[new Date(habitLog.date).getDate() - 1] = habitLog.checkType;
        });
        return habitLogTypes;
    }

    getDaysAmountInMonth(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
        return new Date(year, month, 0).getDate();
    }

    getFirstMonthDayAsWeekDay(month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
        return new Date(year, month - 1, 0).getDay() + 1;
    }
}

export default Calendar;