import React, {Component} from 'react';
import {HabitLogType} from "../../shared/model-enum";
import { connect } from 'react-redux';
import {checkHabit, updateLog} from "../../redux/actions";
import Button from '../atoms/Button';
import styled, {css} from 'styled-components';

interface HabitCheckProps {
    selectedHabit: number
    date: string
    logId?: number
    checkHabit
    updateLog
}

const CheckModal = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 70px);
  grid-column-gap: 1rem;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  background-color: white;
  box-shadow: 2px 2px 5px 3px lightgrey;
`;

class HabitCheck extends Component<HabitCheckProps> {

    handleClick(check: HabitLogType) {
        const {logId, selectedHabit, date} = this.props;
        return () => {
            (this.props.logId ?
                this.props.updateLog(logId,selectedHabit,date,check) :
                this.props.checkHabit(selectedHabit, date, check))
        }
    };

    render() {
        return (
            <CheckModal>
                <Button onClick={this.handleClick(HabitLogType.DOESNT_COUNT)} className={'habit-check__button'}>not today</Button>
                <Button onClick={this.handleClick(HabitLogType.FAIL)} className={'habit-check__button'}>failed</Button>
                <Button onClick={this.handleClick(HabitLogType.WARNING)} className={'habit-check__button'}>partially</Button>
                <Button onClick={this.handleClick(HabitLogType.SUCCESS)} className={'habit-check__button'}>perfectly</Button>
            </CheckModal>
        );
    }
}

const mapStateToProps = ({ habits: { selectedHabit } }) => ({ selectedHabit });

export default connect(mapStateToProps, { checkHabit, updateLog })(HabitCheck);
