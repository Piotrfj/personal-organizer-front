import React, {Component} from 'react';
import './HabitList.css';
import Habit from "../Habit/Habit";
import {HabitItem} from "../../models";

interface HabitListProps {
    habits: HabitItem[];
    selectHabitFunction: (habitId) => void;
}

class HabitList extends Component<HabitListProps> {

    getHabits = () => {
        return this.props.habits.map((habit: HabitItem) => <Habit selectHabitFunction={this.props.selectHabitFunction} key={habit.id} id={habit.id} habit={habit.content}/>)
    };

    render() {
        return (
            <div className={'habits-list'}>
                {this.getHabits()}
            </div>
    );
    }
}

export default HabitList;