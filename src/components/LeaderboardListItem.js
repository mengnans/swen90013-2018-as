/* @flow */

import React from "react";

export default class LeaderboardListItem extends React.Component {

    props: {
        data: React.PropTypes.object,
        key: Number,
        onClickLeaderboardListItem: Function,
    };

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={"LeaderboardListItem"}
                onClick={this.props.onClickLeaderboardListItem}
            >
                {this.props.key}
                {this.props.data.claps}
                {this.props.data.serviceName}
            </div>
        );

    }
}
