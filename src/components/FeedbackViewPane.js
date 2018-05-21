/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";

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

    render() {
        return (
            <div className="ViewFeedbackPane">
                {this.renderRating()}
                {this.renderFeedbackButtons()}
            </div>
        );
    }

    renderRating() {
        let windowsWidth = this.props.width;
        let starDimension, starSpacing;

        if (windowsWidth >= this.minimalWidthForStarText) {
            starDimension = `${parseInt(windowsWidth / 8)}px`;
            starSpacing = `${parseInt(windowsWidth / 80)}px`;
            // define the maximum star dimension
            if (windowsWidth > this.maximumWidth) {
                starDimension = "120px";
                starSpacing = "12px";
            }
        }
        // text will be hidden, thus stars can be a little bit larger
        else {
            starDimension = `${parseInt(windowsWidth / 6)}px`;
            starSpacing = `${parseInt(windowsWidth / 60)}px`;
        }

        const ratings = this.props.service.feedback.overAllRating;

        return (
            <div>
                {this.renderRatingList()}
                {this.renderStarHeading()}
                {this.renderRatingNum()}
                <div className={"OverallStarBlock"}>
                    {this.renderLeftStarText()}
                    <div className={"OverallStar"}>
                        <Star
                            starDimension={starDimension}
                            starSpacing={starSpacing}
                            rating={ratings}
                        />
                    </div>
                    {this.renderRightStarText()}
                </div>
            </div>);
    }

    renderStarHeading() {
        let windowsWidth = this.props.width;
        let heading;
        let ratingValue = this.props.service.feedback.overAllRating
            .toLocaleString(
                undefined, // leave undefined to use the browser's locale,
                // or use a string like 'en-US' to override it.
                {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                },
            );

        if (windowsWidth < this.minimalWidthForStarText) {
            heading = "Overall: " + ratingValue;
        } else {
            heading = "Overall accessibility rating: " + ratingValue;
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

    renderLeftStarText() {
        let windowsWidth = this.props.width;

        if (windowsWidth < this.minimalWidthForStarText) {
            return null
        } else {
            return (
                <div className={"OverallStarLeftText"}>
                    Not very accessible
                </div>
            );
        }
    }

    renderRightStarText() {
        let windowsWidth = this.props.width;

        if (windowsWidth < this.minimalWidthForStarText) {
            return null
        } else {
            return (
                <div className={"OverStarRightText"}>
                    Very<br/>accessible
                </div>
            );
        }

    }

    renderRatingList() {
        return this.props.service.feedback.ratings.map((data) => (
            <RatingListItem
                data={data}
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
