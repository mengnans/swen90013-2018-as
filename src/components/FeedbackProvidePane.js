/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";
import iss from "../iss";

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
        const ratings = this.props.service.feedback.ratings;
        let initialData = {};

        initialData.ratings = [];

        ratings.map(rating => {
            let ratingItem = {};

            ratingItem.ratingType = rating.ratingType;
            ratingItem.rating = this.unDefinedRating;
            ratingItem.comment = null;
            initialData.ratings.push(ratingItem);
        });

        this.state = {
            ratingData: initialData,
            inputtingIndex: this.noInputtingIndex,
            ratingProvided: this.noFeedbackProvided,
        };
    }

    onInputtingAreaChange(event) {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.inputtingIndex].comment =
            event.target.value;

        this.setState({
            ratingData: ratingData,
        });
    }

    onRatingChange(newRating) {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.inputtingIndex].rating = newRating;
        this.setState({
            ratingData: ratingData,
        });
    }

    onClickRatingListItem(index) {
        this.setState({
            inputtingIndex: index,
        });
    }

    // submit feedback
    onClickSubmit() {
        let data = this.state.ratingData;
        let validRatings = [];

        data.ratings.map((ratingItem) => {
            let rating = ratingItem.rating;
            // TODO: do something about the comments
            // for example, what if rating is undefined, but the comment is not empty
            let comment = ratingItem.comment;

            // add valid ratings
            if (rating !== this.unDefinedRating) {
                validRatings.push(ratingItem);
            }
        });

        // only submit valid ratings
        data.ratings = validRatings;

        try {
            let responseJson = iss.provideFeedback(data.serviceId, data);

            console.log(responseJson);
        } catch (error) {
            console.log("error");
        }

        // TODO: do something here, inform the user the feedback has been submitted
        // alert("submitted");
        // go back to service page
        // let path = "/service/";
        //
        // path += this.props.service.slug;
        // this.context.router.push(
        //     path
        // );

    }

    // delete all the comments
    onClickDelete() {
        let ratingData = this.state.ratingData;

        for (let ratingIndex = 0; ratingIndex < ratingData.length; ratingIndex++) {
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
            <div className="ProvideFeedbackPane">
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
                      value={this.state.ratingData.ratings[this.state.inputtingIndex].comment}
                      onChange={this.onInputtingAreaChange.bind(this)}
            >

            </textarea>
        );
    }

    renderStar() {
        const starDimension = "100px";
        const starSpacing = "10px";

        return (
            <div className={"OverallStarBlock"}>
                <div className={"OverallStarLeftText"}>Not very accessible</div>
                <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={this.state.ratingData.ratings[this.state.inputtingIndex].rating}
                        changeRating={this.onRatingChange.bind(this)}
                    />
                </div>
                <div className={"OverStarRightText"}>Very<br/>accessible</div>
            </div>
        );
    }

    renderButtons() {

        return (
            <div className={"ButtonPane1"}>
                <FlatButton
                    className={"FeedbackButton FeedbackButtonDone"}
                    label={"Done"}
                    onClick={this.onClickDone.bind(this)}
                />
                <div className={"Separator"}/>

                <FlatButton
                    className={"FeedbackButton FeedbackButtonCancel"}
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
