import React, { Component } from 'react';
import HabitList from '../../components/HabitList/HabitList';
import HabitDetails from './HabitDetails';
import { connect } from 'react-redux';
import './HabitTable.scss';
import {loadHabits, loadLastCheckLog, selectHabit} from 'actions'

class HabitView extends Component<{selectHabit, loadHabits, habits, loadLastCheckLog}> {

  componentDidMount(): void {
    this.props.loadHabits();
    this.props.loadLastCheckLog();
  }

  render() {
    return (
          <div className={'habit-table'}>
            <div className={'habit-table__list'}>
              <HabitList/>
            </div>
            <HabitDetails/>
          </div>
    );
  }
}

const mapStateToProps = ({ habits: { items } }) => ({ items });

export default connect(mapStateToProps, { loadHabits, selectHabit, loadLastCheckLog })(HabitView);