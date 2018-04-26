/* @flow */

import React from "react";
import icons from "../icons";
import Star from "./Stars";

class RatingListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderStar() {
        if (this.props.data.rating >= 0) {
            const starSpacing = '5px';
            const starDimension = '28px';

            return (
                <Star
                    starSpacing={starSpacing}
                    starDimension={starDimension}
                    rating={this.props.data.rating}
                />
            );
        }
    }

    renderChevron() {
        if (this.props.disabled) {
            return null;
        } else {
            return (
                <icons.Chevron/>
            );
        }
    }

    render() {
        let ratingType = this.props.data.ratingType;
        let icon = '';


        if (ratingType === "Wheelchair access") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        } else if (ratingType === "Signage") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        } else {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        }


        return (
            <div className={"RatingListItem plain-text"}
                 onClick={this.props.onClickRatingListItem}
            >
                <div className={"RatingListItemIcon"}>{icon}</div>
                <div className={"RatingListItemText"}>{ratingType}</div>
                <div className={"RatingListItemStar"}>{this.renderStar()}</div>
                <div className={"RatingListItemChevron"}>{this.renderChevron()}</div>
            </div>
        );

    }

}


export default RatingListItem;
