/* @flow */

import React from "react";
import HeaderBar from "./HeaderBar";
import LeaderboardListItem from "./LeaderboardListItem";

export default class LeaderboardPane extends React.Component {

    mockLeaderboardData = [];

    constructor(props) {
        super(props);

        // generate the mock data
        // TODO: put real data here and remove mock data
        for (let index = 0; index < 6; index++) {

            let mockLeaderboardItemData = {};

            mockLeaderboardItemData.serviceName = "Fake Service: " + index;

            mockLeaderboardItemData.claps = 400 - 10 * index;

            mockLeaderboardItemData.slug = "111-my-housing-service";

            this.mockLeaderboardData.push(mockLeaderboardItemData)
        }
    }

    render() {

        return (
            <div className={"LeaderboardPane"}>
                <HeaderBar
                    primaryText={"Leaderboard"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                {this.renderLeaderBoardList()}
            </div>
        );
    }

    renderLeaderBoardList() {

        return this.mockLeaderboardData.map((data, index) => (
            <LeaderboardListItem
                data={data}
                index={index}
            />
        ));

    }

}
