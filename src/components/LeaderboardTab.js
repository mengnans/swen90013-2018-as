/* @flow */

import React from "react";

export default class LeaderboardTab extends React.Component {

    render() {

        const activeTab = this.props.activeTab;
        const rightActive = activeTab === "right" ? "active" : "";
        const leftActive = activeTab === "left" ? "active" : "";

        return (
            <div className="twoTab">
                <button
                    className={`left ${leftActive}`}
                    onClick={() => this.props.switchTab("left")}
                >
                    {this.props.left}
                </button>
                <button
                    className={`right ${rightActive}`}
                    onClick={() => this.props.switchTab("right")}
                >
                    {this.props.right}
                </button>
            </div>
        );
    }
}