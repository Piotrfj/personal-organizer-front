import React, {Component} from 'react';
import HabitList from "../../components/HabitList/HabitList";
import HabitDetails from "./HabitDetails";
import './HabitTable.scss';
import {HabitItem} from "../../models";
import {getHabits} from "../../services/habit-service";

interface HabitTableState {
    habits: HabitItem[];
    selectedItem: number,
}

class HabitTable extends Component<{}, HabitTableState> {

    state = {
        habits: [],
        selectedItem: null,
    };

    componentDidMount(): void {
        this.loadHabits()
    }

    loadHabits = () => {
        getHabits().then((res) => {
            this.setState({habits: res.data, selectedItem: res.data[0].id})
        });
    };

    reloadHabits = () => {
        getHabits().then((res) => {
            this.setState({habits: res.data})
        });
    };

    selectHabit = (habitId) => {
        this.setState({selectedItem: habitId})
    };

    render() {
        return (
            <div className={'habitTable'}>
                <div>
                    <HabitList
                        habits={this.state.habits}
                        selectHabitFunction={this.selectHabit}/>
                </div>
                {this.state.selectedItem ? <HabitDetails reloadHabits={this.reloadHabits} selectedItem={this.state.selectedItem}/> : ''}
            </div>
        );
    }
}

export default HabitTable;