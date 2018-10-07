/* @flow */

import React from "react";
import icons from "../icons";
import Star from "./Stars";

/**
 * This class encapsulates service rating information pertaining to a
 * single category.
 *
 */
class RatingListItem extends React.Component {

    /**
     * The minimal viewport width required in order to render the text
     * on this list item (px).
     *
     * @type {Number}
     */
    minimalWidthForRatingListItemText = 400;

    /**
     * Star spacing to use on small screens (px).
     * @type {String}
     */
    smallStarSpacing = '1px';

    /**
     * Star sizing to use on small screens (px).
     * @type {String}
     */
    smallStarDimension = '24px';

    /**
     * The break used to separate the star graphic and the text
     * on small screens.
     * @type {ReactDOM.Element}
     */
    smallBr = <br/>;

    /**
     * Star spacing to use on large screens (px).
     * @type {String}
     */
    largeStarSpacing = '5px';

    /**
     * Star sizing to use on large screens (px).
     * @type {String}
     */
    largeStarDimension = '28px';

    /**
     * The break used to separate the star graphic and the text
     * on large screens.
     * @type {String}
     */
    largeBr = '   ';

    props: {
        /**
         * The actual viewport width (px).
         * @type {Number}
         */
        width: number,

        /**
         * The category rating information.
         * @type {Object}
         */
        data: object,

        /**
         * Whether or not it's possible to click on this list item.
         * @type {Boolean}
         */
        disabled: boolean,

        /**
         * The function to be called upon clicking this list item.
         * @type {Function}
         */
        onClickRatingListItem: () => void
    }

    /**
     * Renders the star component and text according to the category rating.
     * (i.e a rating of 2.5 means 2.5 filled-in stars will be rendered)
     *
     * @return {ReactDOM.Element}   The star rating and text enclosed in a
     *                              div.
     */
    renderStar() {
        let width = this.props.width;
        let rating = this.props.data.rating;
        let ratingValue;

        ratingValue = (rating !== null) ? rating.toLocaleString(
            undefined, // leave undefined to use the browser's locale,
            // or use a string like 'en-US' to override it.
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
            },
        ) : "0.00";

        if (this.props.data.rating !== null) {
            let starSpacing, starDimension, lineBr;

            if (width < this.minimalWidthForRatingListItemText) {
                starSpacing = this.smallStarSpacing;
                starDimension = this.smallStarDimension;
                lineBr = this.smallBr;
            } else {
                starSpacing = this.largeStarSpacing;
                starDimension = this.largeStarDimension;
                lineBr = this.largeBr;
            }

            return (
                <div>
                    {ratingValue}
                    {lineBr}
                    <Star
                        starSpacing={starSpacing}
                        starDimension={starDimension}
                        rating={rating}
                    />
                </div>
            );
        }
    }

    /**
     * Renders a chevron if the disabled prop is set to true. Otherwise,
     * it will return null instead.
     *
     * @return {ReactDOM.Element}   The chevron element or null.
     */
    renderChevron() {
        if (this.props.disabled) {
            return null;
        } else {
            return (
                <icons.Chevron/>
            );
        }
    }

    /**
     * Renders the entire list item, including the star rating, the
     * category text and an additional category icon.
     *
     * @return {ReactDOM.Element}   The entire rating list item.
     * @override
     */
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

    /**
     * Renders the category associated with this list item.
     * (i.e Quality / Variety of food).
     *
     * @return {ReactDOM.Element}   A div containing the category name.
     */
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
