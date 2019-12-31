import React, {Component} from "react";
import './Root.scss';
import {BrowserRouter, Route, NavLink} from 'react-router-dom'
import HabitTable from "../HabitTable/HabitTable";

export default class Root extends Component {
    render() {
        return (
            <div className={"core-view"}>
                <BrowserRouter>
                    <>
                        <nav className={"core-vew__nav"}>
                            menu
                            <NavLink to="/">Main</NavLink>
                            <NavLink to="/habits">HABITS</NavLink>
                        </nav>
                        <Route path="/habits" component={HabitTable}/>
                    </>
                </BrowserRouter>
            </div>
        );
    }
}
