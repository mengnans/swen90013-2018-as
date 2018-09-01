/* @flow */

import React from "react";

/**
 * Class for the tab component on the leaderboard page.
 */
export default class LeaderboardTab extends React.Component {

    render() {

        /** Keeps track of the tab that is currently active */
        const activeTab = this.props.activeTab;
        /** Assign active string when tab is active (to add as class) */
        const rightActive = activeTab === "rightTab" ? "active" : "";
        const leftActive = activeTab === "leftTab" ? "active" : "";

        return (
            <div className="twoTab">
                <button
                    className={`left ${leftActive}`}
                    onClick={() => this.props.switchTab("leftTab")}
                >
                    {this.props.leftTabContent}
                </button>
                <button
                    className={`right ${rightActive}`}
                    onClick={() => this.props.switchTab("rightTab")}
                >
                    {this.props.rightTabContent}
                </button>
            </div>
        );
    }
}