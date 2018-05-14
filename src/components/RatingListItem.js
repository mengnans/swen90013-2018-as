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

        if (this.props.data.rating >= 0) {


            if (width < this.minimalWidthForRatingListItemText) {
                const starSpacing = '1px';
                const starDimension = '24px';

                return (
                    <Star
                        starSpacing={starSpacing}
                        starDimension={starDimension}
                        rating={rating}
                    />
                );
            } else {
                const starSpacing = '5px';
                const starDimension = '28px';

                return (
                    <Star
                        starSpacing={starSpacing}
                        starDimension={starDimension}
                        rating={rating}
                    />
                );
            }
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
