import React, {Component} from "react";
import {BrowserRouter, Route, NavLink, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'store'
import HabitTable from "../HabitTable/HabitTable";
import './Root.scss';
import Button from "components/atoms/Button";
import GlobalStyle from "theme/GlobalStyle";

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <GlobalStyle/>
                <BrowserRouter>
                    <>
                        <nav className={"core-vew__nav"}>
                            <Button>kappa</Button>
                            <NavLink to="/">Main</NavLink>
                            <NavLink to="/habits">HABITS</NavLink>
                        </nav>
                        <Route exact path="/" render={() => <Redirect to="/habits"/>}/>
                        <Route path="/habits" component={HabitTable}/>
                    </>
                </BrowserRouter>
            </Provider>
        );
    }
}
