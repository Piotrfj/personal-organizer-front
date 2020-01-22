import React, { Component } from 'react';
import HabitList from '../../components/HabitList/HabitList';
import HabitDetails from './HabitDetails';
import { connect } from 'react-redux';
import './HabitTable.scss';
import { HabitItem } from '../../models';
import { loadHabits, selectHabit } from 'actions'

interface HabitTableState {
  habits: HabitItem[];
  selectedItem: number,
}

class HabitView extends Component<{selectHabit, loadHabits, habits}, HabitTableState> {

  state = {
    habits: [],
    selectedItem: null,
  };

  componentDidMount(): void {
    this.loadHabits()
  }

  loadHabits = () => {
    this.props.loadHabits();
    this.props.selectHabit(this.props.habits[0]);
  };

  reloadHabits = () => {
    this.props.loadHabits();
  };

  render() {
    return (
          <div className={'habit-table'}>
            <div className={'habit-table__list'}>
              <HabitList
                  reloadHabits={this.reloadHabits}/>
            </div>
            <HabitDetails reloadHabits={this.reloadHabits}/>
          </div>
    );
  }
}

const mapStateToProps = state => ({
  habits: state.habits.items,
});

export default connect(mapStateToProps, { loadHabits, selectHabit })(HabitView);