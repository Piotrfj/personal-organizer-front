import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";
import HabitCreator from "../../components/HabitCreator/HabitCreator";
import './HabitDetails.scss';
import { connect } from 'react-redux';

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

const mapStateToProps = state => ({
   selectedItem: state.habits.selectedItem,
});

export default connect(mapStateToProps)(HabitDetails);