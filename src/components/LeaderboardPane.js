/* @flow */

import React from "react";
import iss from "../iss";
import HeaderBar from "./HeaderBar";
import LeaderboardListItem from "./LeaderboardListItem";
import LeaderboardTab from "../components/LeaderboardTab";
import ChangeCategoryButton from "../components/ChangeCategoryButton";

type State = {
    leaderboardData: Array<Object>,
    error: Object,
    activeTab: String
}

export default class LeaderboardPane extends React.Component<void, State> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        
        this.switchTab = this.switchTab.bind(this);
        this.changeCategoryClick = this.changeCategoryClick.bind(this);

        this.state = {
            leaderboardData: undefined,
            activeTab: "leftTab"
        }

    }

    componentDidMount(): void {
        this.loadService();
    }

    async loadService(): Promise<void> {
        // Unload previous service
        this.setState({leaderboardData: undefined});

        try {
            let leaderboardData = await iss.requestLeaderboard();

            console.log(leaderboardData);

            this.setState({leaderboardData: leaderboardData});
        } catch (error) {
            this.setState({error: error});
        }

    }

    switchTab(tab) {
        this.setState({
            activeTab: tab,
        })
    }

    changeCategoryClick() {
        this.setState({
            activeTab: "rightTab",
        })
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
                    onClick = {this.changeCategoryClick}
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

    onClickLeaderboardListItem(data: Object): void {
        // the reason why I am using fake slug here is that
        // our backend stores data for the original mock data
        // of the mock iss, that is Housing Service and so on.
        // However, currently, we are using the real data from
        // the service seeker, so the data stored in the backend
        // actually doesn't work
        // We will fix this in sprint 4
        // I can delete this comments before merging in, just
        // want to let you guys know, we still need to fix
        // this issue in the next sprint.
        // TODO: use real data
        // let slug = data.slug;
        let slug = "848049-ronald-mcdonald-house-parkville-house";
        let path = "/service/";

        path += slug;
        this.context.router.push(
            path,
        );
    }

    renderLeaderBoardList() {

        if (this.state.leaderboardData === undefined) {
            return (<div/>)
        }

        return this.state.leaderboardData.map((data, index) => (
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
