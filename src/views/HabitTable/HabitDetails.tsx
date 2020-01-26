import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import HabitCreator from "../../components/HabitCreator/HabitCreator";
import './HabitDetails.scss';

interface HabitDetailsProps {
}

class HabitDetails extends Component<HabitDetailsProps> {
    render() {
        return (
            <div className={"habit-details"}>
                <Calendar/>
                <HabitCreator/>
            </div>
        );
    }
}

export default HabitDetails;