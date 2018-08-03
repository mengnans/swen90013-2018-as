/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";
import iss from "../iss";
import HeaderBar from "./HeaderBar";

export default class FeedbackProvidePane extends React.Component {

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

        const ratings = this.props.service.feedback.ratings;
        let initialData = {};

        initialData.ratings = ratings.map(rating => {
            let ratingItem = {};

            ratingItem.ratingType = rating.ratingType;
            
            return this.resetRating(ratingItem);
        });

        this.state = {
            ratingData: initialData,
            selectedCategory: null,
        };
    }

    onCommentBoxChanged(event) {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.selectedCategory].comment =
            event.target.value;

        this.setState({
            ratingData,
        });
    }

    onRatingChange(newRating) {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.selectedCategory].rating = newRating;

        this.setState({
            ratingData,
        });
    }

    onClickRatingListItem(index) {
        this.setState({
            selectedCategory: index
        });
    }

    // submit feedback
    onClickSubmit() {
        let data = this.state.ratingData;
        let validRatings = data.ratings.filter((ratingItem) => {
            let rating = ratingItem.rating;
            // TODO: do something about the comments
            // for example, what if rating is undefined,
            // but the comment is not empty
            // let comment = ratingItem.comment;

            // add valid ratings
            return (rating !== null);
        });

        // only submit valid ratings
        data.ratings = validRatings;

        try {
            let responseJson = iss.provideFeedback(data.serviceId, data);

            console.log(responseJson);
        } catch (error) {
            console.log("error");
        }

        // TODO: do something here,
        // inform the user the feedback has been submitted
        // alert("submitted");
        // go back to service page
        let path = "/service/";

        path += this.props.service.slug;
        this.context.router.push(
            path
        );
    }

    categoryIsSelected() {
        return this.state.selectedCategory !== null;
    }

    getSelectedRating() {
        if (this.categoryIsSelected()) {
            return this.state.ratingData.ratings[
                this.state.selectedCategory
            ];
        }

        return undefined;
    }

    resetRating(ratingItem) {
        ratingItem.rating = null;
        ratingItem.comment = null;

        return ratingItem;
    }

    ratingIsEmpty(ratingItem) {
        return (
            ratingItem.comment == null &&
            ratingItem.rating == null
        );
    }

    // delete all the comments
    onClickDelete() {
        let ratingData = this.state.ratingData;

        ratingData.ratings = ratingData.ratings.map(ratingItem =>
            this.resetRating(ratingItem)
        );

        this.setState({
            ratingData: ratingData,
        });
    }

    // cancel provide feedback for sub-criteria
    onClickCancel() {
        let ratingData = this.state.ratingData;

        let index = this.state.selectedCategory;

        this.resetRating(ratingData.ratings[index]);

        this.setState({
            selectedCategory: null,
            ratingData: ratingData,
        });
    }

    // provide feedback for sub-criteria
    onClickDone() {
        this.setState({
            selectedCategory: null,
        });
    }

    render() {
        return (
            <div className="ProvideFeedbackPane">
                <HeaderBar
                    primaryText={"Provide Your Feedback"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                <div className={"PlaceHolder"}/>
                {this.renderRating()}
                {this.renderForm()}
            </div>
        );
    }

    renderForm() {
        if (this.categoryIsSelected()) {
            return (
                <div>
                    {this.renderStar()}
                    {this.renderCommentBox()}
                    {this.renderButtons()}
                </div>
            );
        } else {
            return null;
        }

    }

    renderCommentBox() {
        const rating = this.getSelectedRating();

        return (
            <textarea
                className={"InputTextArea"}
                placeholder={"Please leave your comment here."}
                value={rating.comment || undefined}
                onChange={this.onCommentBoxChanged.bind(this)}
            >
            </textarea>
        );
    }

    renderStar() {

        // TODO: move this to it's own component
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

        const rating = this.getSelectedRating();

        return (
            <div className={"OverallStarBlock"}>
                {this.renderLeftStarText()}
                <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={rating.rating || undefined}
                        changeRating={this.onRatingChange.bind(this)}
                    />
                </div>
                {this.renderRightStarText()}
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
                    Not accessible
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
        if (!this.categoryIsSelected()) {

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
                key={"ratingListItem#" + index}
                data={data}
                width={this.props.width}
                onClickRatingListItem=
                    {this.onClickRatingListItem.bind(this, index)}
            />
        ));
    }

    renderFeedbackButtons() {
        let ratings = this.state.ratingData.ratings;
        let disabled = true;

        ratings.forEach((ratingItem) => {
            if (!this.ratingIsEmpty(ratingItem)) {
                disabled = false;
            }
        });

        return (

            <div className={"ButtonPane"}>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Submit"}
                    onClick={this.onClickSubmit.bind(this)}
                    disabled={disabled}
                />
                <div className={"Separator"}/>
                <FlatButton
                    className={"FeedbackButton"}
                    label={"Delete"}
                    onClick={this.onClickDelete.bind(this)}
                    disabled={disabled}
                />
            </div>

        );
    }
}
