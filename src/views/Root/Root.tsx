import React, {Component} from "react";
import './Root.scss';
import HabitTable from "../HabitTable/HabitTable";

export default class Root extends Component {
    render() {
        return (
            <div className={"core-view"}>
                <nav className={"core-vew__nav"}>menu will be here</nav>
                <section className={"core-view__view"}>
                    <HabitTable/>
                </section>
            </div>
        );
    }
}
