import React from 'react';
import RateStar from "react-star-rating-component";

class RatingItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {rating: 0};
        this.submit = this.submit.bind(this);
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    rateStar() {
        return (
            <div
                className = "RateStar"
            >
                Rate for Service<br/>
                <RateStar
                    name = "StarRating"
                    starCount={3}
                    starColor="rgb(255, 221, 81)"
                    emptyStarColor="grey"
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }

    submit() {
       console.log(this.state.rating);
       // POST HERE

    }

    render() {
        const { rating } = this.state;
        return (
            <div>
                <h1>Selected Rating: {rating}</h1>
                <div> {this.rateStar()}</div>
                <button onClick={this.submit}>
                    Submit
                </button>
            </div>
        );
    }
}

export default RatingItem;
