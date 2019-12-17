import React, {Component} from "react";
import './Root.css';
import HabitList from "../../components/HabitList/Habit-list";
import Calendar from "../../components/Calendar";


export default class Root extends Component {
    state = {};

    render() {
        return (
            <>
                <HabitList/>
                <Calendar/>
            </>
        );
    }
}
