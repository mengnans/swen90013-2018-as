/* @flow */

import React from "react";
import FlatButton from "./FlatButton";
import Star from "./Stars";

export default class FeedbackProvideForm extends React.Component {

    minimalWidthForStarText = 600;
    maximumWidth = 1000;

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
                {this.renderStars()}
                {this.renderCommentBox()}
                {this.renderButtons()}
            </div>
        );
    }

    renderCommentBox() {
        return (
            <textarea
                className={"InputTextArea"}
                placeholder={"Please leave your comment here."}
                value={this.state.comment || undefined}
                onChange={this.onCommentBoxChange.bind(this)}
            >
            </textarea>
        );
    }

    renderStars() {

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

        return (
            <div className={"OverallStarBlock"}>
                {this.renderLeftStarText()}
                <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={this.state.rating || undefined}
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
}
