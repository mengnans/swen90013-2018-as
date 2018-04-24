/* @flow */

import React from "react";
import StarRatings from "react-star-ratings";

class Star extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StarRatings
                rating={this.props.rating}
                starRatedColor="rgb(237, 138, 25)"
                starEmptyColor="grey"
                starDimension={this.props.starDimension}
                starSpacing={this.props.starSpacing}
                numberOfStars={3}
            />
        );
    }
}

export default Star;
