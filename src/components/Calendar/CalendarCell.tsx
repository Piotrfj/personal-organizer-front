import React, {Component} from 'react';
import {HabitLogType} from "../../shared/model-enum";
import styled, {css} from 'styled-components';

interface CalendarCellProps {
    type: HabitLogType
    date: string
    onCheck?: (number) => void;
}

const Cell = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    border: 1px solid #999;
    border-radius: 50%;
    font-size: 2rem;
    &:hover {
      cursor: pointer;
    }
    ${({type, theme}) =>
    type &&
    css`
       color: white;
       background-color: ${theme.cellType[type]};
    `}
`;

class CalendarCell extends Component<CalendarCellProps> {
    private cellElement: HTMLDivElement;

    onCheck = () => {
        const top = this.cellElement.offsetTop + this.cellElement.offsetHeight + 10;
        this.props.onCheck(top)
    };

    render() {
        return (
            <Cell onClick={this.onCheck} type={this.props.type} ref={el => this.cellElement = el}>
                {new Date(this.props.date).getDate()}
            </Cell>
        );
    }
}

export default CalendarCell;