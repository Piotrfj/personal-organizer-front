import React, {Component} from 'react';
import {HabitLogType} from "../../shared/model-enum";
import { connect } from 'react-redux';
import {checkHabit, updateLog} from "../../redux/actions";
import {ConvexButton} from '../atoms/Button';
import styled from 'styled-components';
import {boxShadow} from "../../theme/mixins";

interface HabitCheckProps {
    selectedHabit: number
    date: string
    logId?: number
    checkHabit
    updateLog
    onClick: () => void
}

const CheckModal = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-column-gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 1rem;
  background-color: ${({theme}) => theme.paletteBlue.text1};
  ${boxShadow()};
`;

class HabitCheck extends Component<HabitCheckProps> {

    handleClick(check: HabitLogType) {
        const {logId, selectedHabit, date} = this.props;
        return () => {
            this.props.onClick();
            (this.props.logId ?
                this.props.updateLog(logId,selectedHabit,date,check) :
                this.props.checkHabit(selectedHabit, date, check))
        }
    };

    render() {
        return (
            <CheckModal>
                <ConvexButton onClick={this.handleClick(HabitLogType.DOESNT_COUNT)} className={'habit-check__button'}>not today</ConvexButton>
                <ConvexButton onClick={this.handleClick(HabitLogType.FAIL)} className={'habit-check__button'}>failed</ConvexButton>
                <ConvexButton onClick={this.handleClick(HabitLogType.WARNING)} className={'habit-check__button'}>partially</ConvexButton>
                <ConvexButton onClick={this.handleClick(HabitLogType.SUCCESS)} className={'habit-check__button'}>perfectly</ConvexButton>
            </CheckModal>
        );
    }
}

const mapStateToProps = ({ habits: { selectedHabit } }) => ({ selectedHabit });

export default connect(mapStateToProps, { checkHabit, updateLog })(HabitCheck);
