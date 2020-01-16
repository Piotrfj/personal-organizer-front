import React, { Component } from 'react';
import HabitList from '../../components/HabitList/HabitList';
import HabitDetails from './HabitDetails';
import './HabitTable.scss';
import { HabitItem } from '../../models';
import { getHabits } from '../../services/habit-service';
import { habitStore } from 'store';
import { Provider } from 'react-redux';
import { loadData as loadDataAction, selectHabit as selectHabitAction} from 'actions'

interface HabitTableState {
  habits: HabitItem[];
  selectedItem: number,
}

class HabitView extends Component<{}, HabitTableState> {

  state = {
    habits: [],
    selectedItem: null,
  };

  componentDidMount(): void {
    this.loadHabits()
  }

  loadHabits = () => {
      const data = [{id: 1, content: "test", position: 1}];
      habitStore.dispatch(loadDataAction(data));
    // getHabits().then((res) => {
    //   // this.setState({habits: res.data, selectedItem: res.data[0].id})
    //   //   const data = res.data;
    //     const data = [{id: 1, content: "test", position: 1}];
    //     habitStore.dispatch(loadDataAction(res.data));
    //     this.selectHabit(res.data[0].id);
    // });
      // @ts-ignore
      this.selectHabit(habitStore.getState().habits[0].id)
      console.log(habitStore.getState());
  };

  reloadHabits = () => {
    getHabits().then((res) => {
      this.setState({habits: res.data})
    });
  };

  selectHabit = (habitId) => {
    habitStore.dispatch(selectHabitAction(habitId))
  };

  render() {
    return (
        <Provider store={habitStore}>
          <div className={'habit-table'}>
            <div className={'habit-table__list'}>
              <HabitList
                  habits={this.state.habits}
                  selectedItem={this.state.selectedItem}
                  reloadHabits={this.reloadHabits}
                  selectHabitFunction={this.selectHabit}/>
            </div>
            {this.state.selectedItem &&
            <HabitDetails reloadHabits={this.reloadHabits} selectedItem={this.state.selectedItem}/>}
          </div>
        </Provider>
    );
  }
}

export default HabitView;