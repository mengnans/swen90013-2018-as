/* @flow */

import React from "react";
import FlatButton from "./FlatButton";
import StarTextItem from "./StarTextItem";

/**
 * This component encapsulates the form that allows users to submit feedback
 * on a given service.
 */
export default class FeedbackProvideForm extends React.Component {

    props: {
        /**
         * The function to be called when the "Done" button is pressed.
         *
         * @type {function}
         */
        onFeedbackSaved: (number, string) => void,

        /**
         * The function to be called when the "Cancel" button is pressed.
         * @type {function}
         */
        resetCurrentRating: () => void,

        /**
         * The function to be called when we are done submitting feedback
         * and want to return to the category selection page.
         *
         * @type {function}
         */
        clearSelectedCategory: () => void,

        /**
         * The object containing the user's existing rating information for
         * this category.
         *
         * @type {object}
         */
        rating: object,

        /**
         * The actual width of the viewport (px).
         *
         * @type {number}
         */
        width: number
    };

    constructor(props: Object) {
        super(props);

        this.state = {
            rating: props.rating.rating,
            comment: props.rating.comment,
        }
    }

    /**
     * Called when the "Cancel" button is clicked.
     *
     * Will reset the data stored in this component's state and clear
     * the selected category of the parent component.
     *
     * @return {undefined}
     */
    onClickCancel() {
        this.props.resetCurrentRating();
        this.props.clearSelectedCategory();
    }

    /**
     * Called when the "Done" button is clicked.
     *
     * Will save the form data in the parent component and also
     * clear the selected category, so the application returns
     * to the category selection screen.
     *
     * @return {undefined}
     */
    onClickDone() {
        this.props.onFeedbackSaved(this.state.rating, this.state.comment);
        this.props.clearSelectedCategory();
    }

    /**
     * Triggered when the comment box value changes. Will save
     * This method will save the updated value to state.
     *
     * @param  {Event} event The text area update event.
     * @return {undefined}
     */
    onCommentBoxChange(event) {
        this.setState({
            comment: event.target.value,
        });
    }

    /**
     * Triggered when the user clicks on a star to rate the service.
     * This method will save the updated value to state.
     *
     * @param  {number} rating  The updated rating value.
     * @return {undefined}
     */
    onRatingChange(rating: number) {
        this.setState({
            rating,
        });
    }

    /**
     * Renders the stars, the comment box and the buttons used to
     * control the form.
     *
     * @override
     */
    render() {
        return (
            <div>
                <StarTextItem onRatingChange={this.onRatingChange.bind(this)}
                    width={this.props.width}
                    rating={this.state.rating}
                />
                {this.renderCommentBox()}
                {this.renderButtons()}
            </div>
        );
    }

    /**
     * Renders the comment box field used for entering a comment on the
     * quality of the service.
     *
     * @return {ReactDOM.Element}   The rendered text area element.
     */
    renderCommentBox() {
        return (
            <textarea
                className={"InputTextArea"}
                placeholder={
                    "Please leave your comment about the " +
                    this.props.rating.ratingType.toString().toLowerCase() +
                    "."
                }
                value={this.state.comment || undefined}
                onChange={this.onCommentBoxChange.bind(this)}
            >
            </textarea>
        );
    }

    /**
     * Renders the "Cancel" and "Done" buttons used to control the form.
     *
     * @return {ReactDOM.Element}   A div containing both of the buttons.
     */
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
