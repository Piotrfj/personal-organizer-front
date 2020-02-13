import React, {Component} from 'react';
import HabitList from './HabitList';
import HabitDetails from './HabitDetails';
import {connect} from 'react-redux';
import {loadHabits, loadLastCheckLog, selectHabit} from 'redux/actions'
import styled from 'styled-components';
import ModalController from "../../components/organisms/ModalController";

const StyledWrapper = styled.div`
  color: ${({theme}) => theme.paletteBlue.text3};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: 10px;
`;

class HabitView extends Component<{ selectHabit, loadHabits, habits, loadLastCheckLog }> {

    componentDidMount(): void {
        this.props.loadHabits();
        this.props.loadLastCheckLog();

    }

    render() {
        return (
            <StyledWrapper>
                <HabitList/>
                <HabitDetails/>
            <ModalController/>
            </StyledWrapper>
        );
    }


}

const mapStateToProps = ({habits: {items}}) => ({items});

export default connect(mapStateToProps, {loadHabits, selectHabit, loadLastCheckLog})(HabitView);
