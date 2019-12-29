import React, {Component} from 'react';
import './HabitList.css';
import Habit from "../Habit/Habit";
import {HabitItem} from "../../models";

interface HabitListProps {
    habits: HabitItem[]
    selectedItem: number
    reloadHabits: () => void
    selectHabitFunction: (habitId) => void
}

class HabitList extends Component<HabitListProps> {

    getHabits = () => {
        return this.props.habits.map((habit: HabitItem) => <Habit isSelected={this.props.selectedItem === habit.id} reloadHabits={this.props.reloadHabits} selectHabitFunction={this.props.selectHabitFunction} key={habit.id} habit={habit}/>)
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