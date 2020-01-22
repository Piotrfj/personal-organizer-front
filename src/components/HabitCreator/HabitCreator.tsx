import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createHabit, updateHabit} from "../../services/habit-service";
import {HabitItem} from "../../models";

interface HabitManagementState {
    content: string
}

interface HabitManagementProps {
    habit?: HabitItem
    onHabitSubmitted?: () => void
}

class HabitCreator extends Component<HabitManagementProps, HabitManagementState> {

    state = {
        content: this.props.habit? this.props.habit.content : ''
    };

    handleSubmit = e => {
        e.preventDefault();
        (this.props.habit ? updateHabit(this.props.habit.id, this.state.content) : createHabit(this.state.content)).then(this.refreshHabitList);
        this.setState({content: ''});
    };

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    };

    refreshHabitList = () => {
        if (this.props.onHabitSubmitted) this.props.onHabitSubmitted();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="habitContent">Content</label>
                <input type="text" id={"habitContent"}
                       value={this.state.content}
                       onChange={e => this.handleChange(e)}/>
                <button type={"submit"}>{this.props.habit ? 'Update Habit' : 'Add Habit'}</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
});

export default connect(
    null,
    mapDispatchToProps,
)(HabitCreator);