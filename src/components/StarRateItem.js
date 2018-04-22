/* @flow */

import React from "react";
import classnames from "classnames";
import StarRatings from "react-star-ratings";
import icons from "../icons";

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
                        {compact: this.props.compact}
                    )}
                >
                    {this.renderStars(rating)}
                    {this.renderViewAllAccessibility()}
                </div>
            </div>
        );
    }

    renderStars(rating) {

        return (
            <div
                className="travel-time"
            >
                <icons.Tram
                    className="ColoredIcon"
                    aria-label="By public transport"
                />
                Accessibility Rating<br/>
                <StarRatings
                    rating={rating}
                    starRatedColor="rgb(237, 138, 25)"
                    starEmptyColor="grey"
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                    numberOfStars={3}
                />
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
