import React, {Component} from 'react';
import './HabitList.css';
import Habit from "../Habit/Habit";
import axios from "axios";

interface HabitInterface {
    id: number,
    content: string,
}

class HabitList extends Component {

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
        // @ts-ignore
        return this.state.habits.map((habit: HabitInterface) => <Habit selectHabitFunction={this.props.selectHabitFunction} key={habit.id} id={habit.id} habit={habit.content}/>)
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