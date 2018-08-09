/* @flow */

import React from "react";
import icons from "../icons";
import Star from "./Stars";

class RatingListItem extends React.Component {

    minimalWidthForRatingListItemText = 400;

    props: {
        width: number,
        data: object,
        disabled: boolean,
        onClickRatingListItem: () => void
    }

    constructor(props) {
        super(props);
    }

    renderStar() {
        let width = this.props.width;
        let rating = this.props.data.rating;
        let ratingValue = (rating !== null) ? rating.toLocaleString(
            undefined, // leave undefined to use the browser's locale,
            // or use a string like 'en-US' to override it.
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
            },
        ) : "0.00";

        if (this.props.data.rating !== null) {
            let starSpacing, starDimension;

            if (width < this.minimalWidthForRatingListItemText) {
                starSpacing = '1px';
                starDimension = '24px';

                return (
                    <div>
                        {ratingValue}
                        <br/>
                        <Star
                            starSpacing={starSpacing}
                            starDimension={starDimension}
                            rating={rating}
                        />
                    </div>
                );
            } else {
                starSpacing = '5px';
                starDimension = '28px';

                return (
                    <div>
                        {ratingValue + "    "}
                        <Star
                            starSpacing={starSpacing}
                            starDimension={starDimension}
                            rating={rating}
                        />
                    </div>
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
        // TODO: find suitable icons for food
        let icon = '';
        if (ratingType === "Wheelchair access") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="Wheelchair"
            />);

        } else if (ratingType === "Signage") {
            icon = (<icons.Signage
                className="ColoredIcon"
                aria-label="signage"
            />);

        } else {
            icon = (<icons.Food
                className="ColoredIcon"
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
