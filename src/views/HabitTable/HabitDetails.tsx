import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import HabitCreator from "../../components/HabitCreator/HabitCreator";
import './HabitDetails.scss';

interface HabitDetailsProps {
    selectedItem: number
    reloadHabits: () => void
}

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <div className={"habit-details"}>
                <Calendar/>
                <HabitCreator onHabitSubmitted={this.props.reloadHabits}/>
            </div>
        );
    }
}

export default HabitDetails;