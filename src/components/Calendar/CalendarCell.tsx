import React, {Component} from 'react';
import {HabitLogType} from "../../model-enum";

interface CalendarCellProps {
    type: HabitLogType
    date: string
    onCheck?: (number) => void;
}

class CalendarCell extends Component<CalendarCellProps> {
    private cellElement: HTMLDivElement;

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

    onCheck = () => {
        const top = this.cellElement.offsetTop + this.cellElement.offsetHeight + 10;
        this.props.onCheck(top)
    };

    render() {
        return (
            <div onClick={this.onCheck} className={"calendar__cell cell " + this.getClass(this.props.type)} ref={el => this.cellElement = el}>
                <p>
                    {new Date(this.props.date).getDate()}
                </p>
            </div>
        );
    }
}

export default CalendarCell;