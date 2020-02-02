import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'redux/store'
import HabitView from './Habit/HabitView';
import MainTemplate from "../components/templates/MainTemplate";

export default class Root extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MainTemplate>
                        <Route exact path="/" render={() => <Redirect to="/habits"/>}/>
                        <Route path="/habits" component={HabitView}/>
                    </MainTemplate>
                </BrowserRouter>
            </Provider>
        );
    }
}
