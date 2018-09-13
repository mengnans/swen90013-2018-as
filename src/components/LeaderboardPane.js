/* @flow */

import React from "react";
import iss from "../iss";
import HeaderBar from "./HeaderBar";
import LeaderboardListItem from "./LeaderboardListItem";
import LeaderboardTab from "../components/LeaderboardTab";
import ChangeCategoryButton from "../components/ChangeCategoryButton";
import LeaderboardCategoryListItem from "./LeaderboardCategoryListItem";
import categories from "../constants/categories";

/**
 * The number of leaderboard results to display at a time.
 * @type {number}
 */
const numResults = 6;

type State = {
    leaderboardData: Array<Object>,
    error: Object,
    activeTab: String,
    /**
     * Dictates the category mode.
     * @type {Boolean}
     */
    categoryMode: Boolean
}

export default class LeaderboardPane extends React.Component<void, State> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.switchTab = this.switchTab.bind(this);
        this.onClickChangeCategory = this.onClickChangeCategory.bind(this);
        this.onClickLeaderboardListItem =
            this.onClickLeaderboardListItem.bind(this);
        this.setFlag = this.setFlag.bind(this);

        this.state = {
            leaderboardData: undefined,
            activeTab: "leftTab",
            categoryMode: false,
        }
        this.switchTab = this.switchTab.bind(this);

    }

    componentDidMount(): void {
        this.loadService();
    }

    async loadService(): Promise<void> {
        // Unload previous service
        this.setState({
            leaderboardData: undefined,
        });

        try {
            let leaderboardData = await iss.requestLeaderboard(numResults);

            this.setState({
                leaderboardData: leaderboardData,
            });
        } catch (error) {
            this.setState({error: error});
        }

    }

    async loadServicesWithCategory(category, tab): Promise<void> {
        // Unload previous service
        this.setState({
            leaderboardData: undefined,
            activeTab: undefined,
            categoryMode: undefined,
        });

        try {
            let leaderboardData = await iss.requestLeaderboard(numResults, category);

            this.setState({
                leaderboardData: leaderboardData,
                activeTab: tab,
                categoryMode: true,
            });
        } catch (error) {
            this.setState({error: error});
        }

    }

    onClickChangeCategory() {
        this.setState({
            categoryMode: false,
        })
    }

    switchTab(tab) {
        this.setState({
            activeTab: tab,
            categoryMode: false,
        })
    }

    render() {

        let list;

        let categoryMode = this.state.categoryMode;

        let shouldHide = this.state.activeTab == "leftTab";

        if (this.state.activeTab == "leftTab" || categoryMode == true) {
            list = this.renderLeaderBoardList();
        } else {
            list = this.renderLeaderBoardCategoryList();
        }

        return (
            <div className={"LeaderboardPane"}>
                <HeaderBar
                    primaryText={"Leaderboard"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                <div className="TabBar">
                    <ChangeCategoryButton
                        className = {"Left"}
                        shouldHide = {shouldHide}
                        onClick = {this.onClickChangeCategory}
                        children = {"Change Category"}
                    />
                    <LeaderboardTab
                        className= {"Middle"}
                        leftTabContent="All"
                        rightTabContent="Categories"
                        activeTab={this.state.activeTab}
                        switchTab={this.switchTab}
                    />
                    <div className={"Right"}/>
                </div>
                {list}
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
                onClickLeaderboardListItem={this.onClickLeaderboardListItem}
            />
        ));

    }

    /**
     * Set the 'categoryFlag' to the category information, which is
     * displayed on the clicked row in the leaderboard category list
     * board.
     * @param {String} categoryInfo - category information of the list item.
     * @return {void}
     */
    setFlag(categoryInfo) {
        this.setState({
            categoryFlag: categoryInfo,
        });
    }

    /**
     * List all the category information on the leaderboard.
     * @return {React.Component} The category list component
     */
    renderLeaderBoardCategoryList() {
        return (
            <div className="List categories">
                {
                    categories.map(category => {
                        return (
                            <LeaderboardCategoryListItem
                                category={category}
                                key={category.key}
                                getCategory={this.setFlag}
                                loadWithCategory=
                                    {this.loadServicesWithCategory.bind(this)}
                            />
                        );
                    })
                }
            </div>
        );
    }
}
