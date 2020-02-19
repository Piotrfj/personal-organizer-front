import React, { Component } from 'react';
import { HabitItem } from "../../shared/models";
import { formatDate } from "../../shared/utils";
import { deleteHabit, selectHabit } from "../../redux/actions";
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import EventHandler, { EventType } from 'services/eventHandler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretSquareUp } from '@fortawesome/free-solid-svg-icons/faCaretSquareUp';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons/faCaretSquareDown';
import OptionsDropdown from "../molecules/OptionsDropdown";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export interface HabitProps {
    habit: HabitItem
    reloadHabits: () => void
    selectHabit: (habitId) => void
    goUp: () => void
    goDown: () => void
    selectedHabit: number
    lastCheckDate: string
    deleteHabit: (number) => void
    last: boolean
    first: boolean
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1rem;
  align-items: center;
  padding: 1.2rem;
  border: 1px solid ${({theme}) => theme.paletteBlue.text1};
  &:nth-child(n+2) {
  border-top: none;
  }
  &:hover {
    background-color: ${({theme}) => theme.paletteBlue.text1};
    cursor: pointer;
  }

  ${({isSelected, theme}) =>
    isSelected &&
    css`
      background-color: ${theme.paletteBlue.dark};
      &:hover {
      background-color: ${theme.paletteBlue.main};
      }
    `};
`;

const StyledArrowIcon = styled(FontAwesomeIcon)`
  width: 25px!important;
  height: 25px;
  ${({theme, disabled}) => css`
    color: ${theme.paletteBlue.text3};
    ${disabled && css`
      opacity: .3;
  `}
  `};
`;

const ArrowButtonsWrapper = styled.div`
  display: grid;
  grid-row-gap: .5rem;
`;

const ListContent = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  width: 25px!important;
  height: 25px;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: darkgreen;
  color: ${({theme}) => theme.paletteBlue.text4};
`;

class Habit extends Component<HabitProps> {

    currentDateFormatted = formatDate(new Date());

    handleEditClick = () => {
        EventHandler.emit(EventType.EDIT_HABIT, this.props.habit);
    };

    handleDeleteClick = () => {
        this.props.deleteHabit(this.props.habit.id)
    };

    public render() {
        const {lastCheckDate} = this.props;
        const isSelected = this.props.habit.id === this.props.selectedHabit;
        const isChecked = lastCheckDate === this.currentDateFormatted;
        return (
            <Wrapper isSelected={isSelected} isChecked={isChecked}
                     onClick={this.props.selectHabit.bind(this.props, this.props.habit.id)}>
                <ArrowButtonsWrapper>
                    <StyledArrowIcon disabled={this.props.first ? 1 : 0} onClick={this.props.goUp}
                                     icon={faCaretSquareUp}/>
                    <StyledArrowIcon disabled={this.props.last ? 1 : 0} onClick={this.props.goDown}
                                     icon={faCaretSquareDown}/>
                </ArrowButtonsWrapper>
                <ListContent>
                    <p>{this.props.habit.content}</p>
                    <p>Last time checked: {lastCheckDate ? lastCheckDate : 'never'}</p>

                </ListContent>
                {isChecked && <IconWrapper><CheckIcon icon={faCheck}/></IconWrapper>}
                <OptionsDropdown
                    actions={[{name: 'Edit', cb: this.handleEditClick}, {name: 'Delete', cb: this.handleDeleteClick}]}/>
            </Wrapper>
        );
    }

}

const mapStateToProps = ({habits: {selectedHabit}}) => ({selectedHabit});

export default connect(mapStateToProps, {selectHabit, deleteHabit})(Habit);
