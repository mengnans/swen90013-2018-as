/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import Star from "./Stars";
import iss from "../iss";
import HeaderBar from "./HeaderBar";
import FeedbackProvideForm from "./FeedbackProvideForm";

export default class FeedbackProvidePane extends React.Component {

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

    onCommentBoxChange(event) {
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

    // cancel provide feedback for sub-criteria
    resetCurrentRating() {
        let ratingData = this.state.ratingData;

        let index = this.state.selectedCategory;

        this.resetRating(ratingData.ratings[index]);

        this.setState({
            ratingData: ratingData,
        });
    }

    // provide feedback for sub-criteria
    clearSelectedCategory() {
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
                {this.categoryIsSelected() ?
                    this.renderForm() :
                    this.renderRatingList()
                }
            </div>
        ); 
    }

    renderForm() {
        return <FeedbackProvideForm
            rating={this.getSelectedRating()}
            width={this.props.width}
            onCommentBoxChange={this.onCommentBoxChange.bind(this)}
            onRatingChange={this.onRatingChange.bind(this)}
            resetRating={this.resetCurrentRating.bind(this)}
            clearSelectedCategory={this.clearSelectedCategory.bind(this)}
        />
    }

    renderRatingList() {
        let list = this.state.ratingData.ratings.map((data, index) => (
            <RatingListItem
                key={"ratingListItem#" + index}
                data={data}
                width={this.props.width}
                onClickRatingListItem=
                    {this.onClickRatingListItem.bind(this, index)}
            />
        ));

        return (
            <div>
                {list}
                {this.renderFeedbackButtons()}
            </div>
        );
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
