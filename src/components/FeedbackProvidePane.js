/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";

export default class FeedbackProvidePane extends React.Component {

    unDefinedRating = -1;
    noInputtingIndex = -1;
    noFeedbackProvided = 0;

    props: {
        service: Service,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };


    constructor(props: Object) {
        super(props);
        const mockRatingData = {
            "serviceId": this.props.service.id,
            "typeOfRatings": 3,
            "ratings": [
                {
                    "ratingType": "Wheelchair access",
                    "rating": this.unDefinedRating,
                    "comment": null,
                },
                {
                    "ratingType": "Signage",
                    "rating": this.unDefinedRating,
                    "comment": null,
                },
                {
                    "ratingType": "Transport",
                    "rating": this.unDefinedRating,
                    "comment": null,
                },
            ],
        };

        this.state = {
            ratingData: mockRatingData,
            inputtingIndex: this.noInputtingIndex,
            ratingProvided: this.noFeedbackProvided,
        };
    }

    onInputtingAreaChange(newValue) {
        this.state.ratingData.ratings[this.state.inputtingIndex].comment = newValue;
    }

    onRatingChange(newRating) {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.inputtingIndex].rating = newRating;
        this.setState({
            ratingData: ratingData,
        });
    }

    onClickRatingListItem(index) {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide?index=";
        path += index;
        this.context.router.push(
            path
        );
        this.setState({
            inputtingIndex: index,
        });
    }

    // submit feedback
    onClickSubmit() {
        console.log(this.state.ratingData);
        let path = "/service/";

        path += this.props.service.slug;
        this.context.router.push(
            path
        );

    }

    // delete all the comments
    onClickDelete() {
        let ratingData = this.state.ratingData;

        for (let ratingIndex = 0; ratingIndex < ratingData.typeOfRatings; ratingIndex++) {
            ratingData.ratings[ratingIndex].rating = this.unDefinedRating;
            ratingData.ratings[ratingIndex].comment = null;
        }
        this.setState({
            ratingData: ratingData,
            ratingProvided: this.noFeedbackProvided,
        });
    }

    // cancel provide feedback for sub-criteria
    onClickCancel() {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide";
        this.context.router.push(
            path
        );

        let ratingData = this.state.ratingData;
        let ratingProvided = this.state.ratingProvided;

        if (ratingData.ratings[this.state.inputtingIndex].rating !== this.unDefinedRating) {
            ratingData.ratings[this.state.inputtingIndex].rating = this.unDefinedRating;
            ratingProvided--;
        }
        ratingData.ratings[this.state.inputtingIndex].comment = null;

        this.setState({
            inputtingIndex: this.noInputtingIndex,
            ratingData: ratingData,
            ratingProvided: ratingProvided,
        });
    }

    // provide feedback for sub-criteria
    onClickDone() {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide";
        this.context.router.push(
            path
        );
        let ratingData = this.state.ratingData;

        let ratingProvided = this.state.ratingProvided;
        ratingProvided++;
        this.setState({
            inputtingIndex: this.noInputtingIndex,
            ratingData: ratingData,
            ratingProvided: ratingProvided,
        });
    }

    render() {
        return (
            <div className="FeedbackPane">
                {this.renderRating()}
                {this.renderInputting()}
            </div>
        );
    }

    renderInputting() {
        if (this.state.inputtingIndex > this.noInputtingIndex) {
            return (
                <div>
                    {this.renderStar()}
                    {this.renderInputtingArea()}
                    {this.renderButtons()}
                </div>
            );
        } else {
            return null;
        }

    }

    renderInputtingArea() {
        return (
            <textarea className={"InputTextArea"}
                      placeholder={"Please input your comment here."}
                      onChange={this.onInputtingAreaChange.bind(this)}
            >

            </textarea>
        );
    }

    renderStar() {
        const starDimension = "100px";
        const starSpacing = "25px";

        return (
            <div className={"RatingStar"}>
                <Star
                    starDimension={starDimension}
                    starSpacing={starSpacing}
                    rating={this.state.ratingData.ratings[this.state.inputtingIndex].rating}
                    changeRating={this.onRatingChange.bind(this)}
                />
            </div>
        );
    }

    renderButtons() {

        return (
            <div className={"ButtonPane"}>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Done"}
                    onClick={this.onClickDone.bind(this)}
                />
                <div className={"Separator"}/>

                <FlatButton
                    className={"FeedbackButton"}
                    label={"Cancel"}
                    onClick={this.onClickCancel.bind(this)}
                />

            </div>

        );
    }

    renderRating() {
        if (this.state.inputtingIndex === this.noInputtingIndex) {

            return (
                <div>
                    {this.renderRatingList()}
                    {this.renderFeedbackButtons()}
                </div>
            );
        }
    }

    renderRatingList() {
        return this.state.ratingData.ratings.map((data, index) => (
            <RatingListItem
                data={data}
                onClickRatingListItem={this.onClickRatingListItem.bind(this, index)}
            />
        ));
    }


    renderFeedbackButtons() {

        return (

            <div className={"ButtonPane"}>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Submit"}
                    disabled={this.state.ratingProvided === this.noFeedbackProvided}
                    onClick={this.onClickSubmit.bind(this)}
                />
                <div className={"Separator"}/>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Delete"}
                    disabled={this.state.ratingProvided === this.noFeedbackProvided}
                    onClick={this.onClickDelete.bind(this)}
                />
            </div>

        );
    }
}
