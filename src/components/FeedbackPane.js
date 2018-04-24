/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import sendEvent from "../google-tag-manager";
import RatingListItem from "./RatingListItem";

export default class FeedbackPane extends React.Component {
    props: {
        service: Service,
    };

    constructor(props: Object) {
        super(props);
        const mockRatingData = {
            "typeOfRatings": 3,
            "overAllRating": 2.4,
            "ratings": [
                {
                    "ratingType": "Wheelchair access",
                    "rating": 2.2,
                },
                {
                    "ratingType": "Signage",
                    "rating": 2.8,
                },
                {
                    "ratingType": "Transport",
                    "rating": 1.2,
                },
            ],
        };

        this.state = {
            isProvidingAccessibilityFeedback: false,
            ratingData: mockRatingData,
        };
    }

    onClickAccessibilityFeedback(): void {
        this.setState({
            isProvidingAccessibilityFeedback: true,
        });
    }

    recordSuggestChange(): void {
        sendEvent({
            event: "suggestServiceChange",
            service: this.props.service.id,
        });
    }


    render() {
        return (
            <div className="FeedbackPane">
                {this.renderFeedbackButtons()}
                {this.renderRatingList()}
            </div>
        );
    }

    renderRatingList() {
        return this.state.ratingData.ratings.map((data) => (
            <RatingListItem data={data}/>
        ));
    }


    renderFeedbackButtons() {
        if (this.state.isProvidingAccessibilityFeedback) {
            return null;
        } else {
            return (

                <div className="FeedbackButton">
                    <FlatButton label={"Provide Accessibility Feedback"}
                                onClick={this.onClickAccessibilityFeedback.bind(this)}/>
                    <br/>
                    <br/>
                    <a
                        className="suggestChange"
                        onClick={this.recordSuggestChange.bind(this)}
                        href={
                            "mailto:database@infoxchange.org" +
                            "?subject=" +
                            encodeURIComponent(`Ask Izzy changes: ${this.props.service.id}`) +
                            "&body=" +
                            encodeURIComponent(
                                `Contact name:

                            Contact number:

                            Contact email:

                            Details of change:

                            `.replace(/^ +/gm, "")
                            )
                        }
                    >
                        <FlatButton label={"Provide General Feedback"}/>
                    </a>

                </div>

            );
        }
    }
}
