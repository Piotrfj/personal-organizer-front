import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'store'
import HabitView from './HabitTable/HabitView';
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
