import React, {Component} from 'react';
import './Habit.scss';

export interface HabitProps {
    id: number
    habit: string
    selectHabitFunction: (habitId) => void
}

export default class Habit extends Component<HabitProps> {

  state = {
    date: '2019-12-17',
    selected: 1,
  };


    public render() {
        return (
            <div className="habit" onClick={this.props.selectHabitFunction.bind(this.props, this.props.id)}>
                <p>{this.props.habit}</p>
            </div>
        );
    }
}
