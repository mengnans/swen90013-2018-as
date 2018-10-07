/* @flow */

import React from "react";
import classnames from "classnames";
import icons from "../icons";
import Star from "./Stars";

/**
 * This component displays the overall rating
 * of a service (including the stars).
 */
class FeedbackItem extends React.Component {

    props: {
        /**
         * Whether or not this component is compact.
         * If this value is set to true, the "View All"
         * text will not be rendered.
         *
         * @type {boolean}
         */
        compact: boolean,

        /**
         * The number of individual ratings this service has received.
         * @type {number}
         */
        numberOfRatings: number,

        /**
         * The overall rating value for this service (between 0 and 3).
         * @type {number}
         */
        rating: number,

        /**
         * How large each star should be when rendered (px).
         * @type {number}
         */
        starDimension: number,

        /**
         * How much space should be added between stars (px).
         * @type {number}
         */
        starSpacing: number
    };

    static defaultProps = {
        compact: false,
        numberOfRatings: 0,
    };

    /**
     * @override
     */
    render() {
        return (
            <div>
                <div
                    className={classnames(
                        "FeedbackItem",
                        {compact: this.props.compact},
                    )}
                >
                    {this.renderStars()}
                    {this.renderViewAllAccessibility()}
                </div>
            </div>
        );
    }

    /**
     * Renders the stars, the number of ratings and the overall rating value
     * for this service.
     *
     * @return {ReactDOM.Element}   The rendered rating information (a div).
     */
    renderStars() {

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
                Food Rating<br/>
                {ratingValue + "  "}
                <Star
                    rating={this.props.rating}
                    starDimension={this.props.starDimension}
                    starSpacing={this.props.starSpacing}
                />
                <br/> Ratings:
                {" " + numberOfRatings.toLocaleString()}

            </div>
        );
    }

    /**
     * Renders the "View All" text below the main rating information if the
     * compact prop is set to false.
     *
     * @return {ReactDOM.Element} The "View All" text.
     */
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
