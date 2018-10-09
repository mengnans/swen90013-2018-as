/* @flow */
import React from "react";
import LinkListItem from "./LinkListItem";
import icons from "../icons";
import type {Category} from "../constants/categories";

export default class LeaderboardCategoryListItem extends React.Component {
    props: {
        /**
         * Indicate the service category
         */
        category: Category,
        /**
         * This function is passed in from LeaderboardPane component
         */
        loadWithCategory: Function,
    };
    state: void;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * Sets the category information of this row
     * to the state of the leaderboard pane.
     * (After clicking this item, it will
     * load all services in this category).
     * @return {void}
     */
    onClick() {
        this.props.loadWithCategory(this.props.category.name, "rightTab");
    }

    static sampleProps = {
        default: {
            category: {
                key: "material-aid",
                name: "Material Aid",
                byline: "Clothes and other goods",
                icon: icons.Things,
            },
        }};

    /**
     * Render the LeaderboardCategpryListItem component
     * @returns {React.Component} The LeaderboardCategpryListItem component
     */
    render() {
        let Icon = this.props.category.icon || icons.House;

        return (
            <LinkListItem
                className="CategoryListItem hero"
                leftIcon={
                    <Icon className="ColoredIcon icon-fg-color big" />
                }
                rightIcon={<icons.Chevron />}
                primaryText={this.props.category.name}
                secondaryText={this.props.category.byline}
                onClick={this.onClick}
            />
        );
    }

}
