/* @flow */

import React from "react";
import HeaderBar from "./HeaderBar";
import LeaderboardListItem from "./LeaderboardListItem";
import LeaderboardTab from "../components/LeaderboardTab";
import ChangeCategoryButton from "../components/ChangeCategoryButton";

export default class LeaderboardPane extends React.Component {

    state = {
        activeTab: "leftTab",
    }

    switchTab(tab) {
        this.setState({
            activeTab: tab,
        })
    }
    ChangeCategoryClick() {
        this.setState({
            activeTab: "rightTab",
        })
    }

    mockLeaderboardData = [];

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.switchTab = this.switchTab.bind(this);
        this.ChangeCategoryClick = this.ChangeCategoryClick.bind(this);

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
                <ChangeCategoryButton
                    onClick = {this.ChangeCategoryClick}
                />
                <LeaderboardTab
                    leftTabContent="App"
                    rightTabContent="Categories"
                    activeTab={this.state.activeTab}
                    switchTab={this.switchTab}
                />
                {this.renderLeaderBoardList()}
            </div>
        );
    }

    /**
     * Navigates to the service page
     *
     * @param index number
     */
    onClickLeaderboardListItem(data) {
        let slug = data.slug;
        let path = "/service/";

        path += slug;
        this.context.router.push(
            path
        );
    }

    renderLeaderBoardList() {

        return this.mockLeaderboardData.map((data, index) => (
            <LeaderboardListItem
                data={data}
                index={index}
                key={index}
                onClickLeaderboardListItem
                    ={this.onClickLeaderboardListItem.bind(this, data)}
            />
        ));

    }

    

}
