import React, {Component} from 'react';
import Calendar from "../../components/Calendar";
// import PropTypes from 'prop-types';

class HabitDetails extends Component {
    render() {
        return (
            <div>
                <Calendar selectedHabit={this.props.selectedItem}/>
            </div>
        );
    }
}

// HabitDetails.propTypes = {};

export default HabitDetails;