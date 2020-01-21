import React, { Component } from 'react';
import HabitList from '../../components/HabitList/HabitList';
import HabitDetails from './HabitDetails';
import { connect } from 'react-redux';
import './HabitTable.scss';
import { HabitItem } from '../../models';
import { getHabits } from '../../services/habit-service';
import { loadData as loadDataAction, selectHabit as selectHabitAction} from 'actions'

interface HabitTableState {
  habits: HabitItem[];
  selectedItem: number,
}

class HabitView extends Component<{selectHabit, loadData, selectedItem}, HabitTableState> {

  state = {
    habits: [],
    selectedItem: null,
  };

  componentDidMount(): void {
    this.loadHabits()
  }

  loadHabits = () => {
    getHabits().then((res) => {
        this.props.loadData(res.data);
        this.props.selectHabit(res.data[0].id);
    });
  };

  reloadHabits = () => {
    getHabits().then((res) => {
      this.props.loadData(res.data);
    });
  };

  render() {
    return (
          <div className={'habit-table'}>
            <div className={'habit-table__list'}>
              <HabitList
                  selectedItem={this.state.selectedItem}
                  reloadHabits={this.reloadHabits}/>
            </div>
            <HabitDetails reloadHabits={this.reloadHabits}/>
          </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadData: data => dispatch(loadDataAction(data)),
  selectHabit: habitId => dispatch(selectHabitAction(habitId))
});

const mapStateToProps = ({ selecteditem }) => ({ selectedItem });

export default connect(mapStateToProps, mapDispatchToProps)(HabitView);