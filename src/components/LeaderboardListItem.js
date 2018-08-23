/* @flow */

import React from "react";
import icons from "../icons";

export default class LeaderboardListItem extends React.Component {

    props: {
        data: React.PropTypes.object,
        key: Number,
        index: Number,
        onClickLeaderboardListItem: Function,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"LeaderboardListItem plain-text"}
                 onClick={this.props.onClickLeaderboardListItem}
            >
                {this.renderRank()}
                {this.renderIcon()}
                {this.renderClap()}
                {this.renderServiceName()}
                {this.renderCategoryIcon()}
            </div>
        );
    }

    renderRank() {
        return (
            <div className={"ranking"}>
                {this.props.index + 1}
            </div>
        );
    }

    renderServiceName() {
        return (
            <div className={"ServiceName"}>
                <h2 className={"name"}>{this.props.data.serviceName}</h2>
            </div>
        );
    }

    renderCategoryIcon() {
        return (
            <div className={"CategoryIcon"}>
                <icons.House className="big"/>
            </div>
        );
    }

    renderIcon() {
        return (
            <div className={"icon"}>
                <icons.Clap className="big"/>
            </div>
        );
    }

    renderClap() {
        return (
            <div className={"clap"}>
                {this.props.data.claps}
            </div>
        );
    }

}
