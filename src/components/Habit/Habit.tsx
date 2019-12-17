import * as React from 'react';
import axios from "axios";

export interface IHabitProps {
    id: number
    habit: string
}

export default class Habit extends React.Component<IHabitProps> {
    public render() {
        return (
            <div className="habit">
                <p>{this.props.habit}</p>
                <button onClick={this.checkSuccess}>Success</button>
                <button>Failure</button>
            </div>
        );
    }

    private checkSuccess = () => {
        axios.post('http://127.0.0.1:3001/log',
            {
                id: this.props.id,
                date: this.getDate(),
                check: 1
            })
            .then(res => {
                console.log(res.data);
            })
    };

    getDate = () => {
     const d = new Date();
     return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    };
}
