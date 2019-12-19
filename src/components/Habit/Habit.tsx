import * as React from 'react';
import axios from "axios";
import './Habit.scss';

export interface IHabitProps {
    id: number
    habit: string
    selectHabitFunction: ()=>{}
}

export default class Habit extends React.Component<IHabitProps> {

  state = {
    date: '2019-12-17',
    selected: 1,
  };


    public render() {
        return (
            <div className="habit">
                <p>{this.props.habit}</p>
                <form onSubmit={this.submit}>
                  <input defaultValue={"2019-12-17"} type="text"/>
                  <select>
                    <option value="1">SUCCESS</option>
                    <option value="2">PARTIALY</option>
                    <option value="3">DOESNT COUNT</option>
                    <option value="4">FAIL</option>
                  </select>
                  <button type="submit" >check</button>
                </form>
            </div>
        );
    }

    getDate = () => {
     const d = new Date();
     return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    };

  private submit = (e) => {
    e.preventDefault();
    const date = e.target[0].value;
    const check = e.target[1].value;
    axios.post('http://127.0.0.1:3001/log',
        {
          id: this.props.id,
          date,
          check
        })
  }
}
