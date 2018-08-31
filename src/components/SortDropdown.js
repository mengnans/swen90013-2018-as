/* @flow */

import React from "react";

export default class SortDropdown extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className = "dropdown">
                <label>Sort by</label>
                <select className = "dropdown-content">
                    <option>Most relevant</option>
                    <option>Most claps</option>
                </select>
            </div>
        );
    }
}


