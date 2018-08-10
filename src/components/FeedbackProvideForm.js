/* @flow */

import React from "react";
import FlatButton from "./FlatButton";
import StarTextItem from "./StarTextItem";

export default class FeedbackProvideForm extends React.Component {

    props: {
      onFeedbackSaved: Function,
      resetCurrentRating: Function,
      clearSelectedCategory: Function,
      rating: object,
      width: number
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            rating: null,
            comment: null
        }
    }

    // cancel provide feedback for sub-criteria
    onClickCancel() {
      this.props.resetCurrentRating();
      this.props.clearSelectedCategory();
    }

    // provide feedback for sub-criteria
    onClickDone() {
      this.props.onFeedbackSaved(this.state.rating, this.state.comment);
      this.props.clearSelectedCategory();
    }

    onCommentBoxChange(event) {
        this.setState({
            comment: event.target.value
        });
    }

    onRatingChange(rating) {
        this.setState({
            rating
        });
    }

    render() {
        return (
            <div>
                <StarTextItem onRatingChange={this.onRatingChange.bind(this)}
                    width={this.props.width}
                    rating={this.props.rating.rating}
                />
                {this.renderCommentBox()}
                {this.renderButtons()}
            </div>
        );
    }

    renderCommentBox() {
        return (
            <textarea
                className={"InputTextArea"}
                placeholder={"Please leave your comment about the " + this.props.rating.ratingType.toString().toLowerCase() + "."}
                value={this.state.comment || undefined}
                onChange={this.onCommentBoxChange.bind(this)}
            >
            </textarea>
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
}
