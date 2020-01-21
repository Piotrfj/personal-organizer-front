import React, {Component} from 'react';
import './Calendar.scss'
import CalendarCell from "./CalendarCell";
import {HabitLog} from "../../models";
import {HabitLogType} from "../../model-enum";
import {getLog} from "../../services/habit-service";
import HabitCheck from "../HabitCheck/HabitCheck";

interface CalendarState {
    currentMonth: number;
    currentMonthChecks: HabitLogType[]
    currentHabitLogs: HabitLog[]
    checkMode: boolean
    currentSelectedDate: string
    currentSelectedLogId: number
    top: number
}

interface CalendarProps {
    selectedHabit: number;
}

class Calendar extends Component<CalendarProps, CalendarState> {

    readonly currentDate = new Date();

    state = {
        currentMonth: new Date().getMonth(),
        currentMonthChecks: [],
        currentHabitLogs: [],
        checkMode: false,
        currentSelectedDate: null,
        currentSelectedLogId: null,
        top: null
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
                {this.state.checkMode && (
                    <div className={'calendar__check-modal'} style={{top: this.state.top}} onMouseLeave={this.turnOffCheckMode}>
                        <HabitCheck onCheck={this.loadCurrentHabitLog}
                                    logId={this.state.currentSelectedLogId}
                                    habitId={this.props.selectedHabit}
                                    date={this.state.currentSelectedDate}/>
                    </div>
                )}
            </div>
        );
    }

    private loadCurrentHabitLog = () => {
        getLog(this.props.selectedHabit)
            .then(habitLog => {
                this.setState({
                    currentMonthChecks: this.getHabitLogTypesForCurrentMonth(habitLog.data),
                    currentHabitLogs: habitLog.data
                });
            });
    };

    private getDays = () => {
        const calendarCells = [];
        for (let i = 1; i <= this.getDaysAmountInMonth(this.state.currentMonth); i++) {
            let dateFormatted = this.formatDate(new Date(this.currentDate.getFullYear(), this.state.currentMonth, i))
            calendarCells.push(<CalendarCell onCheck={(top: number) => this.turnOnCheckMode(top, dateFormatted)}
                                             date={dateFormatted}
                                             type={HabitLogType.EMPTY}/>)
        }
        this.state.currentHabitLogs.filter((habitLog: HabitLog) => new Date(habitLog.date).getMonth() === this.state.currentMonth).forEach((habitLog: HabitLog) => {
            calendarCells[new Date(habitLog.date).getDate() - 1] =
                <CalendarCell onCheck={(top: number) => this.turnOnCheckMode(top, habitLog.date, habitLog.id)}
                              date={habitLog.date}
                              type={habitLog.checkType}/>
        });
        return calendarCells;
    };


    private getPreviousMonthFillingDays(): JSX.Element[] {
        const daysAmountInPreviousMonth = this.getDaysAmountInMonth(this.state.currentMonth - 1);
        const daysToFill = this.getFirstMonthDayAsWeekDay() - 1;
        const PreviousMonthDaysAsCells = [];
        for (let i = daysAmountInPreviousMonth - daysToFill + 1; i <= daysAmountInPreviousMonth; i++) {
            const date = new Date(this.currentDate.getFullYear(), this.state.currentMonth - 1, i);
            PreviousMonthDaysAsCells.push(<CalendarCell date={this.formatDate(date)}
                                                        type={HabitLogType.EMPTY}/>);
        }
        return PreviousMonthDaysAsCells;
    }

    private getFollowingMonthFillingDays(): JSX.Element[] {
        const daysToFill = 7 - ((this.getFirstMonthDayAsWeekDay() + this.getDaysAmountInMonth() - 1) % 7);
        const FollowingMonthDaysAsCells = [];
        for (let i = 1; i <= daysToFill; i++) {
            const date = new Date(this.currentDate.getFullYear(), this.state.currentMonth + 1, i);
            FollowingMonthDaysAsCells.push(<CalendarCell date={this.formatDate(date)}
                                                         type={HabitLogType.EMPTY}/>);
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

    private turnOnCheckMode = (top: number, currentSelectedDate: string, currentSelectedLogId: number = null) => {
        this.setState({
            checkMode: true,
            currentSelectedDate,
            currentSelectedLogId,
            top
        });
    };

    private turnOffCheckMode = () => {
        this.setState({
            checkMode: false,
            currentSelectedDate: null,
            currentSelectedLogId: null,
            top: null
        });
    };
}



export default connect(mapStateToProps, mapDispatchToProps)(Calendar);