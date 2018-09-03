/* @flow */
import React from "react";
import Star from "./Stars";

export default class StarTextItem extends React.Component {


    minimalWidthForStarText = 600;
    maximumWidth = 1000;

    props: {
        onRatingChange: Function,
        width: number,
        rating: number,
    };

    render() {

        let windowsWidth = this.props.width;
        let starDimension, starSpacing, onRatingChange;


        if (windowsWidth >= this.minimalWidthForStarText) {
            starDimension = `${parseInt(windowsWidth / 8)}px`;
            starSpacing = `${parseInt(windowsWidth / 80)}px`;
            // define the maximum star dimension
            if (windowsWidth > this.maximumWidth) {
                starDimension = "120px";
                starSpacing = "12px";
            }
        } else {
        // text will be hidden
            starDimension = `${parseInt(windowsWidth / 6)}px`;
            starSpacing = `${parseInt(windowsWidth / 60)}px`;
        }

        if (this.props.onRatingChange != undefined) {
            onRatingChange = this.props.onRatingChange.bind(this);
        } else {
            onRatingChange = undefined;
        }

        return (
            <div className={"OverallStarBlock"}>
                {this.renderLeftStarText()}
                <div className={"OverallStar"}>
                    <Star
                        starDimension={starDimension}
                        starSpacing={starSpacing}
                        rating={this.props.rating || undefined}
                        changeRating={onRatingChange}
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
                    Poor
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
                    Exceptional
                </div>
            );
        }
    }

}
