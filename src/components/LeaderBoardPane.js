/* @flow */

import React from "react";
import HeaderBar from "./HeaderBar";
import LeaderBoardListItem from "./LeaderboardListItem";

export default class LeaderBoardPane extends React.Component {

    mockLeaderBoardData = []

    constructor(props) {
        super(props)

        // generate the mock data
        // TODO: put real data here and remove mock data
        for (let index = 0; index < 6; index++) {

            let mockLeaderBoardItemData = {};

            mockLeaderBoardItemData.serviceName = "Fake Service: " + index;

            mockLeaderBoardItemData.claps = 400 - 10 * index;

            mockLeaderBoardItemData.slug = "111-my-housing-service";

            this.mockLeaderBoardData.push(mockLeaderBoardItemData)
        }
    }

    render() {

        return (
            <div className={"LeaderBoardPane"}>
                <HeaderBar
                    primaryText={"Leader board"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                {this.renderLeaderBoardList()}
            </div>
        );
    }

    renderLeaderBoardList() {

        return this.mockLeaderBoardData.map((data, index) => (
            <LeaderBoardListItem
                data={data}
                index={index}
            />
        ));

    }

}
