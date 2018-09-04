/* @flow */

import React from "react";
import icons from "../icons";

export default class SortDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: 'none',
            sortType: this.props.sortType,
        }
        this.onClick = this.onClick.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseMenuHover = this.handleMouseMenuHover.bind(this);
    }

    props: {
        sortType: number,
        changeSort: Function,
    }

    onClick() {
        // this.state({
        //     sortType: 2,
        // })
        this.props.changeSort(true);
    }

    handleMouseHover() {
        this.setState({
            isHover: 'block',
        })
    }

    handleMouseOut() {
        this.setState({
            isHover: 'none',
        })
    }

    handleMouseMenuHover() {
        this.setState({
            isHover: 'block',
        })
    }

    render() {
        return (
            <div className="dropdown">
                {this.renderDropdown()}
            </div>
        );
    }

    renderDropdown() {
        return (
            <div>
                <div className="sort-bar"
                    onMouseEnter={this.handleMouseHover}
                    onMouseLeave={this.handleMouseOut}
                >
                    <label className="sort-text">Sort by</label>
                    <span className="dp-icon">
                        <icons.Down/>
                </span>
                </div>
                <div className="dp-content"
                    style={{display: this.state.isHover}}
                    onMouseEnter={this.handleMouseMenuHover}
                    onMouseLeave={this.handleMouseOut}
                >
                    <div>
                        <p
                            onClick={this.onClick}
                        >Most relevant</p>
                    </div>
                    <div>
                        <p
                            onClick={this.onClick}
                        >Most claps</p>
                    </div>
                </div>
            </div>
        );
    }
}


