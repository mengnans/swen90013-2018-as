import React from "react";
import LinkListItem from "./LinkListItem";
import icons from "../icons";
import type {Category} from "../constants/categories";

export default class LeaderboardCategoryListItem extends React.Component {
    props: {
        category: Category,
        getCategory: Function,
    };
    state: void;
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    /**
     * Sets the category information of this row
     * to the state of the leaderboard pane.
     * @return {void}
     */
    onClick() {
        this.props.getCategory(this.props.category.name);
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
