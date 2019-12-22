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
        currentMonth: new Date().getMonth(),
        currentMonthChecks: [],
    };

    constructor(props: CalendarProps) {
        super(props);
        this.loadCurrentHabitLog();
    }

    componentDidUpdate(prevProps: Readonly<CalendarProps>): void {
        if (prevProps.selectedHabit !== this.props.selectedHabit) {
            this.loadCurrentHabitLog()
        }
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

    private loadCurrentHabitLog = () => {
        axios.get(`${apiUrl}/log/${this.props.selectedHabit}`)
            .then((habitLog: AxiosResponse<HabitLog[]>) => {
                this.setState({currentMonthChecks: this.getHabitLogTypesForCurrentMonth(habitLog.data)});
            });
    };

    private getDays = () => this.state.currentMonthChecks.map((el, i) => <CalendarCell habitId={this.props.selectedHabit} onCheck={this.loadCurrentHabitLog} date={this.formatDate(new Date(this.currentDate.getFullYear(), this.state.currentMonth, i+1))} type={el}/>);

    private getPreviousMonthFillingDays(): JSX.Element[] {
        const daysAmountInPreviousMonth = this.getDaysAmountInMonth(this.state.currentMonth - 1);
        const daysToFill = this.getFirstMonthDayAsWeekDay() - 1;
        const PreviousMonthDaysAsCells = [];
        for (let i = daysAmountInPreviousMonth - daysToFill + 1; i <= daysAmountInPreviousMonth; i++) {
            const date = new Date(this.currentDate.getFullYear(), this.state.currentMonth - 1, i);
            PreviousMonthDaysAsCells.push(<CalendarCell date={this.formatDate(date)}
                                                        type={HabitLogType.EMPTY}
                                                        habitId={this.props.selectedHabit}/>);
        }
        return PreviousMonthDaysAsCells;
    }

    private getFollowingMonthFillingDays(): JSX.Element[] {
        const daysToFill = 7 - ((this.getFirstMonthDayAsWeekDay() + this.getDaysAmountInMonth() - 1) % 7);
        const FollowingMonthDaysAsCells = [];
        for (let i = 1; i <= daysToFill; i++) {
            const date = new Date(this.currentDate.getFullYear(), this.state.currentMonth + 1, i);
            FollowingMonthDaysAsCells.push(<CalendarCell date={this.formatDate(date)}
                                                         type={HabitLogType.EMPTY}
                                                         habitId={this.props.selectedHabit}/>);
        }
        return FollowingMonthDaysAsCells;
    }

    private getHabitLogTypesForCurrentMonth(habitLogs: HabitLog[]): HabitLogType[] {
        const habitLogTypes: HabitLogType[] = [];
        for (let i = 1; i <= this.getDaysAmountInMonth(this.state.currentMonth); i++) {
            habitLogTypes.push(HabitLogType.EMPTY)
        }
        habitLogs.filter(habitLog => new Date(habitLog.date).getMonth() === this.state.currentMonth).forEach((habitLog) => {
            habitLogTypes[new Date(habitLog.date).getDate() - 1] = habitLog.checkType;
        });
        return habitLogTypes;
    }

    getDaysAmountInMonth(month = new Date().getMonth(), year = new Date().getFullYear()) {
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstMonthDayAsWeekDay(month = new Date().getMonth(), year = new Date().getFullYear()) {
        return new Date(year, month, 0).getDay() + 1;
    }

    formatDate(date: string | Date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}

export default Calendar;