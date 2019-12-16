import React, {Component} from 'react';
import './Habit-list.css';
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
        this.requestLog();
    }

    requestHabits = () => {
        axios.get('http://127.0.0.1:3001/habits')
            .then(res => this.setState({habits: res.data}))
    };

    getHabits = () => {
        return this.state.habits.map((habit: HabitInterface) => <Habit key={habit.id} id={habit.id} habit={habit.content}/>)
    };

    render() {
        return (
            <div className={'habits-list'}>
                {this.getHabits()}
            </div>
    );
    }

    private requestLog() {
        axios.get('http://127.0.0.1:3001/log')
            .then(res => {
                console.log(res.data);
            })
    }
}

export default HabitList;