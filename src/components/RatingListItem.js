/* @flow */

import React from "react";
import icons from "../icons";
import Star from "./Stars";
import './RatingListItem.scss'

class RatingListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let ratingType = this.props.data.ratingType;
        let icon = '';
        const starSpacing = '3px';
        const starDimension = '28px';

        if (ratingType === "Wheelchair access") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        } else if (ratingType === "Signage") {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        } else {
            icon = (<icons.Accessibility
                className="ColoredIcon"
                aria-label="By public transport"
            />);
        }

        return (
            <div className="RatingListItem">
                <div className="RatingListItemIcon">{icon}</div>
                <div className="RatingListItemIcon">{ratingType}</div>
                <Star
                    starSpacing={starSpacing}
                    starDimension={starDimension}
                    rating={this.props.data.rating}
                />
            </div>
        );

    }

}


export default RatingListItem;
