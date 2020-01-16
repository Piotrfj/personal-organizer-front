import React, {Component} from 'react';
import {BrowserRouter, Route, NavLink, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import { globalStore } from 'store'
import HabitView from './HabitTable/HabitView';
import Button from 'components/atoms/Button';
import GlobalStyle from 'theme/GlobalStyle';
import { removeItem as removeItemAction } from '../actions';

export default class Root extends Component {

    componentDidMount(): void {
        // globalStore.dispatch(removeItemAction('SMTH', 4));
    }


    render() {
        return (
            <Provider store={globalStore}>
                <GlobalStyle/>
                <BrowserRouter>
                    <>
                        <nav className={"core-vew__nav"}>
                            <Button>kappa</Button>
                            <NavLink to="/">Main</NavLink>
                            <NavLink to="/habits">HABITS</NavLink>
                        </nav>
                        <Route exact path="/" render={() => <Redirect to="/habits"/>}/>
                        <Route path="/habits" component={HabitView}/>
                    </>
                </BrowserRouter>
            </Provider>
        );
    }
}
