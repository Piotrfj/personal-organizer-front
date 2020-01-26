import React, {Component} from 'react';
import { connect } from 'react-redux';
import './HabitList.css';
import Habit from "../Habit/Habit";
import {HabitItem} from "../../models";
import {swapHabitsPositions} from "../../services/habit-service";
import {loadHabits} from "../../actions";

interface HabitListProps {
    items?: HabitItem[]
    selectedHabit: number
    loadHabits: () => void
    selectHabitFunction: (habitId) => void
    lastCheckLog
}

class HabitList extends Component<HabitListProps> {

    swapHabitsPositions = (firstHabit: HabitItem, secondHabit: HabitItem) => {
      return () => {
          swapHabitsPositions(firstHabit, secondHabit)
              .then(this.props.loadHabits)
      }
    };

    getHabits = () => {
        const sortedHabits = [...this.props.items].sort((a, b) => a.positionOrder > b.positionOrder ? 1 : -1);

        return sortedHabits.map((habit, i, habits) => {
            const lastLog = this.props.lastCheckLog.filter(log => log.habitId === habit.id)[0];
            return <Habit
                goUp={i === 0 ? () => {
                } : this.swapHabitsPositions(habit, habits[i - 1])}
                goDown={i === habits.length - 1 ? () => {
                } : this.swapHabitsPositions(habit, habits[i + 1])}
                reloadHabits={this.props.loadHabits}
                selectHabitFunction={this.props.selectHabitFunction}
                lastCheckDate={lastLog && lastLog.date}
                key={habit.id}
                habit={habit}/>;
        })
    };

    render() {
        return (
            <div className={'habits-list'}>
                {this.getHabits()}
            </div>
        );
    }
}

const mapStateToProps = ({ habits: { items, selectedHabit, lastCheckLog } }) => ({ items, selectedHabit, lastCheckLog });

export default connect(mapStateToProps, { loadHabits })(HabitList);