/* @flow */

import React from "react";
import icons from "../icons";

type Props = {
    data: React.PropTypes.object,
    key: Number,
    index: Number,
    onClickLeaderboardListItem: Function,
};


export default class LeaderboardListItem extends React.Component<Props, void> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={"LeaderboardListItem plain-text"}
                onClick={this.props.onClickLeaderboardListItem}
            >
                {this.renderRank()}
                {this.renderClapIcon()}
                {this.renderClapNumber()}
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

        let serviceType = this.props.data.service_type;
        let icon;

        if (serviceType === "Housing Service") {
            icon = <icons.House className="ColoredIcon icon-fg-color big"/>;
        } else if (serviceType === "Food") {
            icon = <icons.Food className="ColoredIcon icon-fg-color big"/>;
        } else if (serviceType === "Legal") {
            icon = <icons.Legal className="ColoredIcon icon-fg-color big"/>;
        } else if (serviceType === "Counselling") {
            icon = <icons.Support className="ColoredIcon icon-fg-color big"/>;
        } else {
            icon = <icons.Things className="ColoredIcon icon-fg-color big"/>;
        }

        return (
            <div className={"CategoryIcon"}>
                {icon}
            </div>
        );
    }

    renderClapIcon() {
        let icon;

        icon = <icons.Clap className="ColoredIcon icon-fg-color big"/>;

        if (this.props.index === 0) {
            icon = <icons.Gold className="ColoredIcon icon-fg-color big"/>;
        } else if (this.props.index === 1) {
            icon = <icons.Silver className="ColoredIcon icon-fg-color big"/>;
        } else if (this.props.index === 2) {
            icon = <icons.Bronze className="ColoredIcon icon-fg-color big"/>;
        } else {
            icon = <icons.Clap className="ColoredIcon icon-fg-color big"/>;
        }

        return (
            <div className={"icon"}>
                {icon}
            </div>
        );
    }

    renderClapNumber() {
        return (
            <div className={"clap"}>
                {this.props.data.claps}
            </div>
        );
    }

}
