import React, {Component} from 'react';
import {createHabit} from "../../services/habit-service";

interface AddHabitState {
    content: string
}

interface AddHabitProps {
    onHabitAdded?: () => void
}

class AddHabit extends Component<AddHabitProps, AddHabitState> {

    state = {
        content : ''
    };

    handleSubmit = e => {
        e.preventDefault();
        createHabit(this.state.content)
            .then(this.refreshHabitList);
        this.setState({content: ''});
    };

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    };

    refreshHabitList = () => {
        if (this.props.onHabitAdded) this.props.onHabitAdded();
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="habitContent">Content</label>
                <input type="text" id={"habitContent"}
                       value={this.state.content}
                       onChange={e => this.handleChange(e)}/>
                <button type={"submit"}>Add Habit</button>
            </form>
        );
    }
}

export default AddHabit;