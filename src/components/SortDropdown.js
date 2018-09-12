/* @flow */

import React from "react";
import icons from "../icons";

export default class SortDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: 'none',
            sortByRelevance: false,
            sortByClaps: false,
        }
        this.onClickRelevance = this.onClickRelevance.bind(this);
        this.onClickClaps = this.onClickClaps.bind(this);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseMenuHover = this.handleMouseMenuHover.bind(this);
    }

    props: {
        changeSort: Function,
    }

    /**
     * change the sort type after clicking "Most relevant" button
     * @return {void}
     */
    onClickRelevance() {
        this.props.changeSort(true);
        this.setState({
            sortByRelevance: true,
            sortByClaps: false,
        })
    }

    /**
     * change the sort type after clicking "Most claps" button
     * @return {void}
     */
    onClickClaps() {
        this.props.changeSort(false);
        this.setState({
            sortByRelevance: false,
            sortByClaps: true,
        })
    }

    handleMouseHover() {
        this.setState({
            hover: 'block',
        })
    }

    handleMouseOut() {
        this.setState({
            hover: 'none',
        })
    }

    handleMouseMenuHover() {
        this.setState({
            hover: 'block',
        })
    }

    render() {
        return (
            <div className="dropdown">
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
                    style={{display: this.state.hover}}
                    onMouseEnter={this.handleMouseMenuHover}
                    onMouseLeave={this.handleMouseOut}
                >
                    <div onClick={this.onClickRelevance}>
                     <icons.Selected isSelected={this.state.sortByRelevance}/>
                     <button className="sort-relevance">Most relevant</button>
                    </div>
                    <div onClick={this.onClickClaps}>
                        <icons.Selected isSelected={this.state.sortByClaps}/>
                        <button className="sort-claps">Most claps</button>
                    </div>
                </div>
            </div>
        );
    }
}


