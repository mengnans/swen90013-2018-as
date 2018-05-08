/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";

export default class FeedbackViewPane extends React.Component {
    props: {
        service: Service,
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
            path
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
        const starDimension = "100px";
        const starSpacing = "25px";
        return (
            <div>
                {this.renderRatingList()}
                <div className={"OverallStarHeading"}>
                    Overall Accessibility Rating:
                </div>
                <div className={"OverallStarBlock"}>
                    <div className={"OverallStarLeftText"}>Not very accessible</div>
                    <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={this.props.service.feedback.overAllRating}
                    />
                    </div>
                    <div className={"OverStarRightText"}>Very<br/>accessible</div>
                </div>
            </div>);
    }

    renderRatingList() {
        return this.props.service.feedback.ratings.map((data) => (
            <RatingListItem
                data={data}
                disabled={true}
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
