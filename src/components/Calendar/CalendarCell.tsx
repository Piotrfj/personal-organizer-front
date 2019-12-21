import React from 'react';

interface CalendarCellProps {
    type: number;
    dayNumber: number;
}

const CalendarCell = ({ type, dayNumber }: CalendarCellProps) => {

    function getClass(type: number) {
        switch(type) {
            case 0: return '';
            case 1: return 'calendar__cell--success';
            case 2: return 'calendar__cell--partially';
            case 3: return 'calendar__cell--doesnt-count';
            case 4: return 'calendar__cell--fail';
        }
    }

    return (
            <div className={"calendar__cell " + getClass(type)}>
                <p>
                    {dayNumber}
                </p>
            </div>
    );
};

export default CalendarCell;