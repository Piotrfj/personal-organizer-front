import React, {Component} from 'react';
import axios from "axios";
import './Calendar.scss'

interface Istate {
    currentMonth: number;
    days: {type: number}[]
}

interface IProps {
    selectedHabit: number;
}

class Calendar extends Component<IProps> {

    readonly currentDate = new Date();

    state: Istate = {
        currentMonth: new Date().getMonth(),
        days: []
    };


    componentDidMount(): void {
        this.requestLog();
    }

    componentDidUpdate(): void {
        console.log(this.state);
    }

    render() {
        return (
            <div className="calendar">
                {this.getDays()}
            </div>
        );
    }

    private getDays() {
        const arr: JSX.Element[] = [];
        const startingDay = this.getStartingDayInMonth();
        const daysInMonth = this.getDaysInMonth();
        const daysInMonth11 = this.getDaysInMonth(11);
        const daysBefore = startingDay - 1;

        const daysAfter = 7 - (startingDay + daysInMonth -1) % 7;
        for (let i = daysInMonth11 - daysBefore + 1; i <= daysInMonth11; i++) arr.push(<div className="calendar__cell calendar__cell--disabled"><p>{i}</p></div>);
        // for (let i = 1; i <= this.getDaysInMonth(); i++) arr.push(<div className={"calendar__cell" + this.getClass(i)}><p>{i}</p></div>);
        this.state.days.forEach((el, i) => {
            arr.push(<div className={"calendar__cell " + this.getClass(el.type)}><p>{i+1}</p></div>)
        });
        for (let i = 1; i <= daysAfter; i++) arr.push(<div className="calendar__cell calendar__cell--disabled"><p>{i}</p></div>);
        return arr;
    }

    getDaysInMonth (month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
        return new Date(year, month, 0).getDate();
    }

    getStartingDayInMonth (month = new Date().getMonth() + 1, year = new Date().getFullYear()) {
        return new Date(year, month - 1, 0).getDay() + 1;
    }

    private requestLog() {
        axios.get('http://127.0.0.1:3001/log/1')
            .then(res => {
                const tab: any[] = [];
                for (let i = 1; i <=31 ; i++) {
                    tab.push({type: 0})
                }
                res.data.forEach((habit) => {
                    const date = new Date(habit.date.substr(0,10));
                    tab[date.getDate()] = {type: habit.checkType};
                    this.setState({days: tab})
                })
            });
    }

    private getClass(type : number) {
        switch(type) {
            case 0: return '';
            case 1: return 'calendar__cell--success';
            case 2: return 'calendar__cell--part';
            case 3: return 'calendar__cell--doesnt-count';
            case 4: return 'calendar__cell--fail';
        }
    }
}

export default Calendar;