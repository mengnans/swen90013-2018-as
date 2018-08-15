/* @flow */

import React from "react";
import classnames from "classnames";
import icons from "../icons";
import Star from "./Stars";

class FeedbackItem extends React.Component {

    props: {
        compact: boolean,
        numberOfRatings: number,
        rating: number,
        starDimension: number,
        starSpacing: number
    };

    static defaultProps = {
        compact: false,
        numberOfRatings: 0,
    };

    constructor() {
        super();
    }

    render() {
        const rating = this.props.rating;

        return (
            <div>
                <div
                    className={classnames(
                        "FeedbackItem",
                        {compact: this.props.compact},
                    )}
                >
                    {this.renderStars(rating)}
                    {this.renderViewAllAccessibility()}
                </div>
            </div>
        );
    }

    renderStars(rating) {

        let ratingValue = rating.toLocaleString(
            undefined, // leave undefined to use the browser's locale,
            // or use a string like 'en-US' to override it.
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
            },
        );
        let numberOfRatings = this.props.numberOfRatings;

        return (
            <div
                className="feedback-item"
            >
                <icons.Accessibility
                    className="ColoredIcon"
                    aria-label="By public transport"
                />
                Accessibility Rating<br/>
                {ratingValue + "  "}
                <Star
                    rating={rating}
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                />
                <br/> Ratings:
                {" " + numberOfRatings.toLocaleString()}

            </div>
        );
    }

    renderViewAllAccessibility() {
        if (!this.props.compact) {
            return (
                <div
                    className="getDirections"
                >
                    View all
                </div>
            );
        }
        return <span/>;
    }


}

export default FeedbackItem;
