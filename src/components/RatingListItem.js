/* @flow */

import React from "react";
import icons from "../icons";
import Star from "./Stars";

class RatingListItem extends React.Component {

    minimalWidthForRatingListItemText = 400;

    constructor(props) {
        super(props);
    }

    renderStar() {
        let width = this.props.width;
        let rating = this.props.data.rating;
        let ratingValue = rating.toLocaleString(
            undefined, // leave undefined to use the browser's locale,
            // or use a string like 'en-US' to override it.
            {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            },
        );


        if (this.props.data.rating >= 0) {
            let starSpacing, starDimension;

            if (width < this.minimalWidthForRatingListItemText) {
                starSpacing = '1px';
                starDimension = '24px';
            } else {
                starSpacing = '5px';
                starDimension = '28px';
            }

            return (
                <div>
                    {ratingValue + "  "}
                <Star
                    starSpacing={starSpacing}
                    starDimension={starDimension}
                    rating={rating}
                />
                </div>
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
                iconType="wheelChair"
                aria-label="Wheelchair"
            />);

        } else if (ratingType === "Signage") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                iconType="signage"
                aria-label="signage"
            />);

        } else {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                iconType="publicTransport"
                aria-label="By public transport"
            />);
        }


        return (
            <div className={"RatingListItem plain-text"}
                 onClick={this.props.onClickRatingListItem}
            >
                <div className={"RatingListItemIcon"}>{icon}</div>
                {this.renderRatingListItemText()}
                <div className={"RatingListItemStar"}>
                    {this.renderStar()}
                </div>
                <div className={"RatingListItemChevron"}>
                    {this.renderChevron()}
                </div>
            </div>
        );

    }

    renderRatingListItemText() {
        let ratingType = this.props.data.ratingType;

        return (
            <div className={"RatingListItemText"}>
                {ratingType}
            </div>
        );
    }

}


export default RatingListItem;
