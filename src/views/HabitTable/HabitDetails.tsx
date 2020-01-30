import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import './HabitDetails.scss';

interface HabitDetailsProps {
}

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <div className={"habit-details"}>
                <Calendar/>
            </div>
        );
    }
}

export default HabitDetails;
