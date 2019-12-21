import React, {Component} from 'react';
import './HabitList.css';
import Habit from "../Habit/Habit";
import axios from "axios";

interface HabitItem {
    id: number,
    content: string,
}

interface HabitListState {
    habits: HabitItem[];
}
interface HabitListProps {
    selectHabitFunction: (habitId) => void;
}

class HabitList extends Component<HabitListProps, HabitListState> {

    state = {
      habits: [],
    };

    componentDidMount() {
        this.requestHabits();
    }

    requestHabits = () => {
        axios.get('http://127.0.0.1:3001/habits')
            .then(res => this.setState({habits: res.data}))
    };

    getHabits = () => {
        return this.state.habits.map((habit: HabitItem) => <Habit selectHabitFunction={this.props.selectHabitFunction} key={habit.id} id={habit.id} habit={habit.content}/>)
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