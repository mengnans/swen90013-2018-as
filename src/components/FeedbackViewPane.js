/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import HeaderBar from "./HeaderBar";
import StarTextItem from "./StarTextItem";

/**
 * The component responsible for listing the ratings for each
 * category pertaining to a service.
 */
export default class FeedbackViewPane extends React.Component {

    /**
     * The minimum viewport width required in order to render the
     * text that accompanies the stars (i.e "Needs Improvement" and
     * "Excellent").
     *
     * @type {Number}
     */
    minimalWidthForStarText = 600;

    props: {
        /**
         * A reference to the service we're showing feedback for.
         *
         * @type {Service}
         */
        service: Service,

        /**
         * The actual viewport width.
         * @type {Number}
         */
        width: number,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };


    constructor(props: Object) {
        super(props);
    }

    /**
     * Triggered when the user clicks the "Provide Feedback" button.
     * Will redirect the application to the Feedback Provision page.
     *
     * @return {undefined}
     */
    onClickProvideYourFeedbackButton(): void {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide";
        this.context.router.push(
            path,
        )
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="ViewFeedbackPane">
                <HeaderBar
                    primaryText={"Rate your experience"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                <div className={"PlaceHolder"}/>
                {this.renderRatingList()}
                {this.renderStarHeading()}
                {this.renderRatingNum()}
                <StarTextItem
                    rating={this.props.service.feedback.overAllRating}
                    width={this.props.width}
                />
                {this.renderFeedbackButtons()}
            </div>
        );
    }

    /**
     * Renders the overall rating for the service.
     *
     * @return {ReactDOM.Element}   A div containing the overall rating.
     */
    renderStarHeading() {
        let windowsWidth = this.props.width;
        let heading;
        let ratingValue = this.props.service.feedback.overAllRating
            .toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
            {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
            },
        );

        if (windowsWidth < this.minimalWidthForStarText) {
            heading = "Overall: " + ratingValue;
        } else {
            heading = "Overall rating: " + ratingValue;
        }

        return (
            <div className={"OverallStarHeading"}>
                {heading}
            </div>
        );
    }

    /**
     * Renders the total number of individual ratings that have been
     * submitted for the given service.
     *
     * @return {ReactDOM.Element}   A div containing the total number of
     *                              ratings for this service.
     */
    renderRatingNum() {
        let info;
        let ratingNum = this.props.service.feedback.overAllCount;

        info = ratingNum + " ratings";

        return (
            <div className={"RatingNumHeading"}>
                {info}
            </div>
        );
    }

    /**
     * Renders the list of RatingListItem elements. Each of which displays
     * a category and its corresponding rating.
     *
     * @return {ReactDOM.Element[]} The list of rendered RatingListItems.
     */
    renderRatingList() {
        return this.props.service.feedback.ratings.map((data, index) => (
            <RatingListItem
                data={data}
                key={index}
                disabled={true}
                width={this.props.width}
            />
        ));
    }

    /**
     * Renders the "Provide Your Feedback" button.
     *
     * @return {ReactDOM.Element}   A wrapped FlatButton.
     */
    renderFeedbackButtons() {
        return (
            <div className={"ButtonPane"}>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Provide Your Feedback"}
                    onClick={this.onClickProvideYourFeedbackButton.bind(this)}
                />
            </div>
        );
    }
}
