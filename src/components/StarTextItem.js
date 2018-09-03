/* @flow */
import React from "react";
import Star from "./Stars";

/**
 * What to divide the star dimensions by depending on screen size.
 */
const starDimensionDivisor = {
    small: 8,
    large: 6,
    max: 120,
}

/**
 * What to divide the star spacing by depending on screen size.
 */
const starSpacingDivisor = {
    small: 80,
    large: 60,
    max: 12,
}

/**
 * Dictates the minimum viewport width required to show star text.
 */
const minimalWidthForStarText = 600;

/**
 * Dictates the maximum width of the stars.
 */
const maximumWidth = 1000;

export default class StarTextItem extends React.Component {

    props: {
        /**
         * The callback to call if the star value is changed.
         */
        onRatingChange: Function,
        /**
         * The width of the viewport.
         */
        width: number,
        /**
         * The pre-defined rating value for the stars.
         */
        rating: number,
    };

    /**
     * @override
     */
    render() {
        let windowsWidth = this.props.width;
        let starDimension, starSpacing;

        if (windowsWidth >= minimalWidthForStarText) {
            starDimension = `${parseInt(
                windowsWidth / starDimensionDivisor.small
            )}px`;
            starSpacing = `${parseInt(
                windowsWidth / starSpacingDivisor.small
            )}px`;
            // define the maximum star dimension
            if (windowsWidth > maximumWidth) {
                starDimension = `${starDimensionDivisor.max}px`;
                starSpacing = `${starSpacingDivisor.max}px`;
            }
        } else {
        // text will be hidden
            starDimension = `${parseInt(
                windowsWidth / starDimensionDivisor.large
            )}px`;
            starSpacing = `${parseInt(
                windowsWidth / starDimensionDivisor.large
            )}px`;
        }

        return (
            <div className={"OverallStarBlock"}>
                {this.renderLeftStarText()}
                <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={this.props.rating || undefined}
                        changeRating={this.props.onRatingChange}
                    />
                </div>
                {this.renderRightStarText()}
            </div>
        );
    }

    /**
     * Renders the text to the left of the star.
     *
     * @returns {ReactDOM.Element} The rendered text element.
     */
    renderLeftStarText() {
        let windowsWidth = this.props.width;

        if (windowsWidth < minimalWidthForStarText) {
            return null
        } else {
            return (
                <div className={"OverallStarLeftText"}>
                    Poor
                </div>
            );
        }
    }

    /**
     * Renders the text to the right of the star.
     *
     * @returns {ReactDOM.Element} The rendered text element.
     */
    renderRightStarText() {
        let windowsWidth = this.props.width;

        if (windowsWidth < minimalWidthForStarText) {
            return null
        } else {
            return (
                <div className={"OverStarRightText"}>
                    Exceptional
                </div>
            );
        }
    }

}
