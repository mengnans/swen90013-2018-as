/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import RatingListItem from "./RatingListItem";
import iss from "../iss";
import HeaderBar from "./HeaderBar";
import FeedbackProvideForm from "./FeedbackProvideForm";

/**
 * Encapsulates the entire Feedback Provision pane (including listing
 * all of the rating items).
 */
export default class FeedbackProvidePane extends React.Component {


    props: {
        /**
         * The service we're providing feedback for.
         */
        service: Service,

        /**
         * The viewport width.
         */
        width: number,

        /**
         * The current app location (required to navigate without changing
         * the location).
         */
        location: object
    };

    /**
     * The router is required to navigate upon feedback submission.
     */
    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    /**
     * @override
     */
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

    /**
     * Updates the feedback state with the newly entered rating value and
     * comment.
     *
     * @param {number} rating The rating value.
     * @param {string} comment The rating comment.
     * @returns {undefined}
     */
    onFeedbackSaved(rating: number, comment: string): void {
        let ratingData = this.state.ratingData;

        ratingData.ratings[this.state.selectedCategory].rating =
            rating;

        ratingData.ratings[this.state.selectedCategory].comment =
            comment;

        this.setState({
            ratingData,
        });
    }

    /**
     * Is called whenever the props change (including a location change).
     *
     * Destructs the requested category from the location change
     * and sets it as the active category.
     *
     * @override
     * @param  {object} props The updated props
     */
    componentWillReceiveProps(props: object): void {
        let selectedCategory = (
            props.location.state &&
            props.location.state.selectedCategory !== undefined
        ) ?
            props.location.state.selectedCategory
            : null;

        this.setState(Object.assign(this.state, {
            selectedCategory,
        }));
    }

    /**
     * Navigates to the current path, passing the new selected category as
     * state.
     *
     * @param {number} index The index of the list item that changed.
     * @returns {undefined}
     */
    onClickRatingListItem(index: number): void {
        this.context.router.push({
            pathname: this.props.location.pathname,
            state: {
                selectedCategory: index,
            },
        });
    }

    /**
     * Submits the saved feedback to the ISS and navigates back to the
     * feedback selection screen.
     *
     * @return {undefined}
     */
    onClickSubmit(): void {
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
            console.log("error at FeedbackProvidePane");
        }

        this.context.router.goBack();
    }

    /**
     * Deletes all of the saved feedback data this user is in the process
     * of entering.
     *
     * @returns {undefined}
     */
    onClickDelete(): void {
        let ratingData = this.state.ratingData;

        ratingData.ratings = ratingData.ratings.map(ratingItem =>
            this.resetRating(ratingItem)
        );

        this.setState({
            ratingData: ratingData,
        });
    }

    /**
     * Determins if a category is currently selected.
     *
     * @returns {boolean} Whether or not a category is selected.
     */
    categoryIsSelected(): boolean {
        return this.state.selectedCategory !== null;
    }

    /**
     * Returns the currently selected rating.
     *
     * @returns {object} The currently selected rating.
     */
    getSelectedRating(): object {
        if (this.categoryIsSelected()) {
            return this.state.ratingData.ratings[
                this.state.selectedCategory
            ];
        }

        return undefined;
    }

    /**
     * Resets the rating for a given category.
     * @param {object} ratingItem The rating item for a given category.
     * @returns {undefined}
     */
    resetRating(ratingItem: object): void {
        ratingItem.rating = null;
        ratingItem.comment = null;

        return ratingItem;
    }

    /**
     * Determines if a rating has been entered for a given category.
     * @param {object} ratingItem The rating item for a given category.
     * @returns {boolean} Whether or not the rating is empty.
     */
    ratingIsEmpty(ratingItem: object): boolean {
        return (
            ratingItem.comment == null &&
            ratingItem.rating == null
        );
    }

    /**
     * Clears the data for the current selected category.
     * @returns {undefined}
     */
    resetCurrentRating(): void {
        let ratingData = this.state.ratingData;

        let index = this.state.selectedCategory;

        this.resetRating(ratingData.ratings[index]);

        this.setState({
            ratingData: ratingData,
        });
    }

    /**
     * Returns to the category selection screen.
     * @returns {undefined}
     */
    clearSelectedCategory(): void {
        this.context.router.goBack();
    }

    /**
     * @override
     */
    render() {
        return (
            <div className="ProvideFeedbackPane">
                <HeaderBar
                    primaryText={"Rate your experience"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                <div className={"PlaceHolder"}/>
                {this.categoryIsSelected() ?
                    this.renderForm()
                    : this.renderRatingList()
                }
            </div>
        );
    }

    /**
     * Renders the form that allows the user to provide feedback.
     * @returns {ReactDOM.Element} The rendered form.
     */
    renderForm() {
        return (<FeedbackProvideForm
            rating={this.getSelectedRating()}
            width={this.props.width}
            onFeedbackSaved={this.onFeedbackSaved.bind(this)}
            resetCurrentRating={this.resetCurrentRating.bind(this)}
            clearSelectedCategory={this.clearSelectedCategory.bind(this)}
                />)
    }

    /**
     * Renders the rating for a given category.
     * @returns  {ReactDOM.Element} The rendered RatingListItem.
     */
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
                <div className={"RatingListItemProvideMode"}>
                    {list}
                </div>
                {this.renderFeedbackButtons()}
            </div>
        );
    }

    /**
     * Renders the buttons allowing you to clear / submit feedback.
     * @returns  {ReactDOM.Element} The rendered pair of buttons
     *                              (wrapped in a div)
     */
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