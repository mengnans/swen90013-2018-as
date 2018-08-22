/* @flow */

import React from "react";

export default class LeaderboardListItem extends React.Component {

    props: {
        data: React.PropTypes.object,
        index: Number,
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                {this.props.index}
                {this.props.data.claps}
                {this.props.data.serviceName}
            </div>
        );

    }
}
