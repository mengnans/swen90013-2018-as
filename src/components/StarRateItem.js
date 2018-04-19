/* @flow */

import React from "react";
import classnames from "classnames";
import StarRatings from "react-star-ratings";

class StarRateItem extends React.Component {
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
                </div>
            </div>
        );
    }

    renderStars(rating) {

        return (
            <div
                className="travel-time"
            >
                Accessibility Rating<br/>
                <StarRatings
                    rating={rating}
                    starRatedColor="rgb(255, 221, 81)"
                    starEmptyColor="grey"
                    starDimension={'32px'}
                    starSpacing={'5px'}
                    numberOfStars={3}
                />
            </div>
        );
    }

    renderDivider() {
        if (!this.props.compact) {
            return (
                <hr/>
            );
        } else {
            return null;
        }
    }
}

export default StarRateItem;
