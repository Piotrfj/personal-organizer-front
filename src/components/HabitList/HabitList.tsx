import React, {Component} from 'react';
import { connect } from 'react-redux';
import './HabitList.css';
import Habit from "../Habit/Habit";
import {HabitItem} from "../../models";
import {swapHabitsPositions} from "../../services/habit-service";

interface HabitListProps {
    items?: HabitItem[]
    selectedItem: number
    reloadHabits: () => void
    selectHabitFunction: (habitId) => void
}

class HabitList extends Component<HabitListProps> {

    swapHabitsPositions = (firstHabit: HabitItem, secondHabit: HabitItem) => {
      return () => {
          swapHabitsPositions(firstHabit, secondHabit)
              .then(this.props.reloadHabits)
      }
    };

    getHabits = () => {
        const sortedHabits = [...this.props.items].sort((a, b) => a.positionOrder > b.positionOrder ? 1 : -1);

        return sortedHabits.map((habit, i, habits) => <Habit
            goUp={i === 0 ? () => {} : this.swapHabitsPositions(habit, habits[i-1])}
            goDown={i === habits.length - 1 ? () => {} : this.swapHabitsPositions(habit, habits[i+1])}
            isSelected={this.props.selectedItem === habit.id}
            reloadHabits={this.props.reloadHabits}
            selectHabitFunction={this.props.selectHabitFunction}
            key={habit.id}
            habit={habit}/>)
    };

    render() {
        return (
            <div className={'habits-list'}>
                {this.getHabits()}
            </div>
        );
    }
}

const mapStateToProps = ({ habits: { items } }) => ({ items });

export default connect(mapStateToProps)(HabitList);