/* @flow */

import React from "react";
import icons from "../icons";

export default class SortDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHover: 'none',
            sortByRelevant: false,
            sortByClaps: false,
        }
        this.onClickRelevant = this.onClickRelevant.bind(this);
        this.onClickClaps = this.onClickClaps.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseMenuHover = this.handleMouseMenuHover.bind(this);
    }

    props: {
        changeSort: Function,
    }

    onClickRelevant() {
        this.props.changeSort(true);
        this.setState({
            sortByRelevant: true,
            sortByClaps: false,
        })
    }
    onClickClaps() {
        this.props.changeSort(false);
        this.setState({
            sortByRelevant: false,
            sortByClaps: true,
        })
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
                      <icons.Selected isSelected={this.state.sortByRelevant}/>
                        <button className="sort-relevant"
                            onClick={this.onClickRelevant}
                        >Most relevant</button>
                    </div>
                    <div>
                        <icons.Selected isSelected={this.state.sortByClaps}/>
                        <button className="sort-claps"
                            onClick={this.onClickClaps}
                        >Most claps</button>
                    </div>
                </div>
            </div>
        );
    }
}


