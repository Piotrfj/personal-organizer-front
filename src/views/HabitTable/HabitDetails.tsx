import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import HabitCreator from "../../components/HabitCreator/HabitCreator";

interface HabitDetailsProps {
    selectedItem: number
    reloadHabits: () => void
}

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <div>
                <Calendar selectedHabit={this.props.selectedItem}/>
                <HabitCreator onHabitSubmitted={this.props.reloadHabits}/>
            </div>
        );
    }
}

export default HabitDetails;