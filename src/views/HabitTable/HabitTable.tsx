import React, {Component} from 'react';
import HabitList from "../../components/HabitList/HabitList";
import HabitDetails from "./HabitDetails";



class HabitTable extends Component {

    state = {
      selectedItem: null,
    };

    selectHabit = (habitId) => {
        this.setState({selectedItem: habitId})
    };

    render() {
        return (
            <div>
                <HabitList
                    // @ts-ignore
                    selectHabitFunction={this.selectHabit}/>
                <HabitDetails selectedItem={this.state.selectedItem} />
            </div>
        );
    }
}

export default HabitTable;