/* @flow */

import React from "react";
import classnames from "classnames";
import icons from "../icons";
import Star from "./Stars";

class StarRateItem extends React.Component {
    static defaultProps = {
        compact: false,
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
                        "TransportTime",
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
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
            },
        );
        let numberOfRatings = 100;
        return (
            <div
                className="travel-time"
            >
                <icons.Accessibility
                    className="ColoredIcon"
                    iconType="wheelChair"
                    aria-label="By public transport"
                />
                Accessibility Rating<br/>
                {ratingValue + "  "}
                <Star
                    rating={rating}
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                />
                <br/> View Count:
                {" " + numberOfRatings.toLocaleString()}

            </div>
        );
    }

    viewAllAccessibilityClick(): void {
        console.log("viewAllAccessibility clicked");
    }

    renderViewAllAccessibility() {
        if (!this.props.compact) {
            return (
                <div
                    className="getDirections"
                    onClick={this.viewAllAccessibilityClick.bind(this)}
                >
                    View all
                </div>
            );
        }
        return <span/>;
    }


}

export default StarRateItem;
