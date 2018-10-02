/* @flow */

import React from "react";
import icons from "../icons";

export default class SortDropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: 'none',
            isClicked: false,
            sort: false,
        }
        this.onClickRelevance = this.onClickRelevance.bind(this);
        this.onClickClaps = this.onClickClaps.bind(this);
        this.onClickSort = this.onClickSort.bind(this);
    }

    props: {
        changeSort: Function,
    }

    /**
     * change the sort type after clicking "Most relevant" button
     * @return {void}
     */
    onClickRelevance() {
        this.props.changeSort(false);
        this.setState({
            sort: false,
            hover: 'none',
        })
    }

    /**
     * change the sort type after clicking "Most claps" button
     * @return {void}
     */
    onClickClaps() {
        this.props.changeSort(true);
        this.setState({
            sort: true,
            hover: 'none',
        })
    }

    /**
     * open or close the drop-down menu after clicking sort-by button
     * @return {void}
     */
    onClickSort() {
        this.setState({
            isClicked: !this.state.isClicked,
        })
        if (this.state.isClicked) {
            this.setState({
                hover: 'block',
            })
        } else {
            this.setState({
                hover: 'none',
            })
        }
    }

    render() {
        return (
            <div className="dropdown">
                <div className="sort-bar"
                    onClick={this.onClickSort}
                >
                    <label className="sort-text">Sort by</label>
                    <span className="dp-icon">
                        <icons.Down/>
                </span>
                </div>
                <div className="dp-content"
                    style={{display: this.state.hover}}
                >
                    <div onClick={this.onClickRelevance}>
                     <icons.Selected isSelected={!this.state.sort}/>
                     <button className="sort-relevance">Most relevant</button>
                    </div>
                    <div onClick={this.onClickClaps}>
                        <icons.Selected isSelected={this.state.sort}/>
                        <button className="sort-claps">Most claps</button>
                    </div>
                </div>
            </div>
        );
    }
}


