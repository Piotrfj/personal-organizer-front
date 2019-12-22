import React, {Component} from 'react';
import HabitCheck from "../HabitCheck/HabitCheck";

interface CalendarCellProps {
    type?: number
    date: string
    habitId: number
    onCheck?: () => void;
}



class CalendarCell extends Component<CalendarCellProps> {

    state = {
        checkMode: false
    };

    getClass(type: number) {
        switch(type) {
            case 0: return '';
            case 1: return 'cell--success';
            case 2: return 'cell--partially';
            case 3: return 'cell--doesnt-count';
            case 4: return 'cell--fail';
        }
    }

    turnOnCheckMode = () => {
       this.setState({checkMode: true})
    };

    private turnOffCheckMode = () => {
        this.setState({checkMode: false})

    };

    render() {
        return (
            <div onClick={this.turnOnCheckMode} className={"calendar__cell cell " + this.getClass(this.props.type)}>
                <p>
                    {new Date(this.props.date).getDate()}
                </p>
                {this.state.checkMode ? (
                    <div className={'cell__check-options'} onMouseLeave={this.turnOffCheckMode}>
                        <HabitCheck turnOffCheckMode={this.turnOffCheckMode} onCheck={this.props.onCheck} habitId={this.props.habitId} date={this.props.date} />
                    </div>
                ) : ''}

            </div>
        );
    }


}

export default CalendarCell;