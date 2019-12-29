import React, {Component} from 'react';
import HabitCheck from "../HabitCheck/HabitCheck";
import {HabitLogType} from "../../model-enum";

interface CalendarCellProps {
    type: HabitLogType
    date: string
    habitId: number
    logId?: number
    onCheck?: () => void;
}

class CalendarCell extends Component<CalendarCellProps> {

    state = {
        checkMode: false
    };

    getClass(type: number) {
        if (!type) return '';
        switch (type) {
            case HabitLogType.EMPTY:
                return '';
            case HabitLogType.SUCCESS:
                return 'cell--success';
            case HabitLogType.PARTIALLY:
                return 'cell--partially';
            case HabitLogType.DOESNT_COUNT:
                return 'cell--doesnt-count';
            case HabitLogType.FAIL:
                return 'cell--fail';
        }
    }

    turnOnCheckMode = () => {
        this.setState({checkMode: true});
    };

    private turnOffCheckMode = () => {
        this.setState({checkMode: false});
    };

    onCheck = () => {
        this.turnOffCheckMode();
        this.props.onCheck();
    };

    render() {
        return (
            <div onClick={this.turnOnCheckMode} className={"calendar__cell cell " + this.getClass(this.props.type)}>
                <p>
                    {new Date(this.props.date).getDate()}
                </p>
                {this.state.checkMode && (
                    <div className={'cell__check-options'} onMouseLeave={this.turnOffCheckMode}>
                        <HabitCheck onCheck={this.onCheck}
                                    logId={this.props.logId}
                                    habitId={this.props.habitId} date={this.props.date}/>
                    </div>
                )}
            </div>
        );
    }
}

export default CalendarCell;