import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import AddHabit from "../../components/AddHabit/AddHabit";

interface HabitDetailsProps {
    selectedItem: number
    reloadHabits: () => void
}

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <div>
                <Calendar selectedHabit={this.props.selectedItem}/>
                <AddHabit onHabitAdded={this.props.reloadHabits}/>
            </div>
        );
    }
}

export default HabitDetails;