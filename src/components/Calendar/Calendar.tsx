import React, {Component} from 'react';
import CalendarCell from "./CalendarCell";
import { HabitLog } from "shared/models";
import { HabitLogType } from "shared/model-enum";
import HabitCheck from "../HabitCheck/HabitCheck";
import { connect } from 'react-redux'
import { loadLogOfCurrentHabit } from "redux/actions";
import { formatDate } from "shared/utils";
import styled, {css} from 'styled-components';

interface CalendarState {
    currentMonth: number;
    checkMode: boolean
    currentSelectedDate: string
    currentSelectedLogId: number
    top: number
}

interface CalendarProps {
    selectedHabit: number;
    loadLogOfCurrentHabit: () => void;
    log;
}

const GridWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 5rem);
  grid-auto-rows: 5rem;
  grid-gap: .5rem;
`;

const CheckModalComponent = styled.div`
  position: absolute;
  top: ${({top}) => top+'px'};
  left: 0;
  right: 0;
  z-index: 1;
`;

class Calendar extends Component<CalendarProps, CalendarState> {

    readonly currentDate = new Date();

    state = {
        currentMonth: new Date().getMonth(),
        checkMode: false,
        currentSelectedDate: null,
        currentSelectedLogId: null,
        top: null
    };

    componentDidUpdate(prevProps): void {
        if (this.props.selectedHabit && prevProps.selectedHabit !== this.props.selectedHabit) {
            this.props.loadLogOfCurrentHabit();
        }
    }

    render() {
        return (
            <GridWrapper>
                {this.getPreviousMonthFillingDays()}
                {this.getDays()}
                {this.getFollowingMonthFillingDays()}
                {this.state.checkMode && (
                    <CheckModalComponent top={this.state.top} onMouseLeave={this.turnOffCheckMode}>
                        <HabitCheck logId={this.state.currentSelectedLogId}
                                    date={this.state.currentSelectedDate}
                                    onClick={this.turnOffCheckMode}/>
                    </CheckModalComponent>
                )}
            </GridWrapper>
        );
    }

    private getDays = () => {
        const calendarCells = [];
        for (let i = 1; i <= this.getDaysAmountInMonth(this.state.currentMonth); i++) {
            let dateFormatted = formatDate(new Date(this.currentDate.getFullYear(), this.state.currentMonth, i))
            calendarCells.push(<CalendarCell onCheck={(top: number) => this.turnOnCheckMode(top, dateFormatted)}
                                             date={dateFormatted}
                                             type={HabitLogType.EMPTY}/>)
        }
        this.props.log.filter((habitLog: HabitLog) => new Date(habitLog.date).getMonth() === this.state.currentMonth).forEach((habitLog: HabitLog) => {
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
            PreviousMonthDaysAsCells.push(<CalendarCell date={formatDate(date)}
                                                        type={HabitLogType.EMPTY}/>);
        }
        return PreviousMonthDaysAsCells;
    }

    private getFollowingMonthFillingDays(): JSX.Element[] {
        const daysToFill = 7 - ((this.getFirstMonthDayAsWeekDay() + this.getDaysAmountInMonth() - 1) % 7);
        const FollowingMonthDaysAsCells = [];
        for (let i = 1; i <= daysToFill; i++) {
            const date = new Date(this.currentDate.getFullYear(), this.state.currentMonth + 1, i);
            FollowingMonthDaysAsCells.push(<CalendarCell date={formatDate(date)}
                                                         type={HabitLogType.EMPTY}/>);
        }
        return FollowingMonthDaysAsCells;
    }

    getDaysAmountInMonth(month = new Date().getMonth(), year = new Date().getFullYear()) {
        return new Date(year, month + 1, 0).getDate();
    }

    getFirstMonthDayAsWeekDay(month = new Date().getMonth(), year = new Date().getFullYear()) {
        return new Date(year, month, 0).getDay() + 1;
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

const mapStateToProps = ({ habits: { selectedHabit, log } }) => ({ selectedHabit, log });

export default connect(mapStateToProps, { loadLogOfCurrentHabit })(Calendar);
