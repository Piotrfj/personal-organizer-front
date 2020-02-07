import React, {Component} from 'react';
import { connect } from 'react-redux';
import Habit from "components/Habit/Habit";
import {HabitItem} from "shared/models";
import {loadHabits, swapHabits} from "redux/actions";
import styled from 'styled-components';
import Heading from "../../components/atoms/Heading";


interface HabitListProps {
    items?: HabitItem[]
    selectedHabit: number
    loadHabits: () => void
    selectHabitFunction: (habitId) => void
    lastCheckLog,
    swapHabits
}

const Wrapper = styled.div`
  padding-top: 20px;
  padding-right: 10px;
  overflow: auto;
`;

class HabitList extends Component<HabitListProps> {

    swapHabitsPositions = (firstHabit: HabitItem, secondHabit: HabitItem) => () => this.props.swapHabits(firstHabit, secondHabit);

    getHabits = () => {
        const sortedHabits = [...this.props.items].sort((a, b) => a.positionOrder > b.positionOrder ? 1 : -1);

        return sortedHabits.map((habit, i, habits) => {
            const lastLog = this.props.lastCheckLog.filter(log => log.habitId === habit.id)[0];
            return <Habit
                goUp={i === 0 ? () => {
                } : this.swapHabitsPositions(habit, habits[i - 1])}
                goDown={i === habits.length - 1 ? () => {
                } : this.swapHabitsPositions(habit, habits[i + 1])}
                first={i === 0}
                last={i === habits.length -1}
                reloadHabits={this.props.loadHabits}
                selectHabitFunction={this.props.selectHabitFunction}
                lastCheckDate={lastLog && lastLog.date}
                key={habit.id}
                habit={habit}/>;
        })
    };

    render() {
        return (
            <Wrapper>
                {this.getHabits()}
                {this.getHabits().length === 0 && <Heading>Failed to download habits or list is empty</Heading>}
            </Wrapper>
        );
    }
}

const mapStateToProps = ({ habits: { items, selectedHabit, lastCheckLog } }) => ({ items, selectedHabit, lastCheckLog });

export default connect(mapStateToProps, { swapHabits, loadHabits })(HabitList);