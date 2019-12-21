import React, {Component} from 'react';
import HabitList from "../../components/HabitList/HabitList";
import HabitDetails from "./HabitDetails";
import './HabitTable.scss';



class HabitTable extends Component {

    state = {
      selectedItem: 0,
    };

    selectHabit = (habitId) => {
        this.setState({selectedItem: habitId})
    };

    render() {
        return (
            <div className={'habitTable'}>
                <div>
                    <HabitList
                        selectHabitFunction={this.selectHabit}/>
                </div>
                <HabitDetails selectedItem={this.state.selectedItem} />
            </div>
        );
    }
}

export default HabitTable;