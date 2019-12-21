import React, {Component} from 'react';
import Calendar from "../../components/Calendar/Calendar";

class HabitDetails extends Component<{selectedItem: number}> {
    render() {
        return (
            <div>
                <Calendar selectedHabit={this.props.selectedItem}/>
            </div>
        );
    }
}

export default HabitDetails;