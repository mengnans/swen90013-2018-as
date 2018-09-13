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
 * The number of leaderboard items to display at a time.
 * @type {number}
 */
const numberOfLeaderboardItems = 6;

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
            /**
             * This is set to true when currently viewing leaderboard results
             * for a specific category.
             * @type {boolean}
             */
            categoryMode: false,
        }
        this.switchTab = this.switchTab.bind(this);

    }

    componentDidMount(): void {
        this.loadService();
    }

    /**
     * Load all services from backend.
     * @returns {Promise} the Promise
     */
    async loadService(): Promise<void> {
        // Unload previous service
        this.setState({
            leaderboardData: undefined,
        });

        try {
            let leaderboardData =
                await iss.requestLeaderboard(numberOfLeaderboardItems);

            this.setState({
                leaderboardData: leaderboardData,
            });

        } catch (error) {
            this.setState({error: error});
        }

    }


    /**
     * Load services from backend, filtered by category.
     * @param {string} category - the category to filter by
     * @param {string} tab - the tab that should be active
     * @returns {Promise} the Promise
     */
    async loadServicesWithCategory(category, tab): Promise<void> {

        // Unload previous service
        this.setState({
            leaderboardData: undefined,
            activeTab: undefined,
            categoryMode: undefined,
        });

        try {
            let leaderboardData =
                await iss.requestLeaderboard(
                    numberOfLeaderboardItems,
                    category
                );

            this.setState({
                leaderboardData: leaderboardData,
                activeTab: tab,
                // Indicates that we are viewing a specific category
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

    /**
     * Switches between the two tabs.
     * @param {string} tab - the tab to switch to
     * @return {void}
     */
    switchTab(tab) {
        // If switching to the left tab, all services are loaded
        if (tab == "leftTab") {
            this.loadService();
        }

        this.setState({
            activeTab: tab,
            // Any time there is a switch of tab, no longer viewing
            // a category
            categoryMode: false,
        })
    }

    render() {

        let list;

        let categoryMode = this.state.categoryMode;

        /**
         * Shouldhise indicates whether the Change Category button should
         * be hidden. It should be hidden when not viewing a category.
         */
        let shouldHide = !categoryMode;

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
     * List all the category information on the leaderboard.
     * @return {React.Component} The category list component
     */
    renderLeaderBoardCategoryList() {
        return (
            <div className="List categories LeaderboardCategory">
                {
                    categories.map(category => {
                        return (
                            <LeaderboardCategoryListItem
                                category={category}
                                key={category.key}
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
