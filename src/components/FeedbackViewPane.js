/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";
import HeaderBar from "./HeaderBar";
import StarTextItem from "./StarTextItem";

export default class FeedbackViewPane extends React.Component {

    minimalWidthForStarText = 600;
    maximumWidth = 1000;

    props: {
        service: Service,
        width: number,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props: Object) {
        super(props);
    }


    onClickProvideYourFeedbackButton(): void {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide";
        this.context.router.push(
            path,
        )
    }

    onRatingChange() {
        // do nothing
        // since the rating here can't be changed
    }

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
                <StarTextItem rating={this.props.service.feedback.overAllRating} width={this.props.width}/>
                {this.renderFeedbackButtons()}
            </div>
        );
    }


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

    renderRatingNum() {
        let info;
        let ratingNum = this.props.service.feedback.overAllCount;

        // ratingNum = 150;
        info = ratingNum + " ratings";
        return (
            <div className={"RatingNumHeading"}>
                {info}
            </div>
        );
    }

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
