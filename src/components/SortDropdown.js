/* @flow */

import React from "react";
// import icons from "../icons";

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

    props:{
        sortType: number,
    }
    onClick() {
        this.state({
            sortType: 2,
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
                        {/*<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="15.000000pt" height="15.000000pt" viewBox="0 0 15.000000 15.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,15.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M26 98 c4 -7 16 -23 27 -35 20 -22 21 -22 40 -6 10 10 23 26 28 35 9 16 4 18 -46 18 -42 0 -54 -3 -49 -12z"/></g></svg>*/}
                        {/*<icons.SortList/>*/}
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


