/* @flow */
/**
 * The leaderboard list is made up by this component
 */
import React from "react";
import icons from "../icons";

type Props = {
    data: React.PropTypes.object,
    key: Number,
    index: Number,
    /**
     * This function is passed in from LeaderboardPane component
     */
    onClickLeaderboardListItem: Function,
};


export default class LeaderboardListItem extends
    React.Component<Props, void> {

    constructor(props) {
        super(props);
    }

    /**
     * Render the LeaderboardListItem component
     *
     * @returns {React.Component} The LeaderboardListItem component
     */
    render() {
        return (
            <div
                className={"LeaderboardListItem plain-text"}
                onClick={() =>
                    this.props.onClickLeaderboardListItem(this.props.data)
                }
            >
                {this.renderRank()}
                {this.renderClapIcon()}
                {this.renderClapNumber()}
                {this.renderServiceName()}
                {this.renderCategoryIcon()}
            </div>
        );
    }

    /**
     * Render the rank for a service according to the clap number
     * @returns {React.Element} The rank element
     */
    renderRank() {
        return (
            <div className={"ranking"}>
                {this.props.index + 1}
            </div>
        );
    }

    /**
     * Render service name in the item
     * @returns {React.Element} The element which is used to show service name
     */
    renderServiceName() {
        return (
            <div className={"ServiceName"}>
                <h2 className={"name"}>{this.props.data.name}</h2>
            </div>
        );
    }

    /**
     * Render the category icon for a service
     *
     * @returns {React.Element} - The element which is used to
     * show the category of a service
     */
    renderCategoryIcon() {

        let serviceType = this.props.data.service_type;
        let icon;

        if (serviceType === "Housing") {
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

    /**
     * Render the clap icon in the list item.
     * (There are totally four different icons.
     * Top three services will use three different
     * icons according to their rank.
     * All services after the third rank will use only the same icon).
     *
     * @returns {React.Element} The element for clap icon
     */
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

    /**
     * Render the clap number for a service
     * @returns {React.Element} The element to show the clap number
     */
    renderClapNumber() {
        return (
            <div className={"clap"}>
                {this.props.data.clap}
            </div>
        );
    }

}
