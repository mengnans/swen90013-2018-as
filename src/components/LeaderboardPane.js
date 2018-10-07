/* @flow */
/**
 * This component is used by leaderboard page
 */
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
    /**
     * Indicates which tab is active
     */
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

        this.state = {
            /**
             * This data includes all list items for the leaderboard.
             */
            leaderboardData: undefined,
            activeTab: "leftTab",
            /**
             * This is set to true when currently viewing leaderboard results
             * for a specific category.
             * @type {boolean}
             */
            categoryMode: false,
        }

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

    /**
     * This function is used for ChangeCategoryButton.
     * After click this button, the boolean variable categoryMode
     * will turn to false.
     * @returns {void}
     */
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

    /**
     * Render the leaderboard pane component.
     * (It is made up of ChangeCategoryButton component,
     * LeaderboardTab component, LeaderboardListItem
     * and LeaderboardCategoryListItem).
     *
     * @returns {React.Component} The leaderboard pane component
     */
    render() {

        let list;

        let categoryMode = this.state.categoryMode;

        /**
         * shouldHide indicates whether the Change Category button should
         * be hidden. It should be hidden when not viewing a category.
         */
        let shouldHide = !categoryMode;
        let listClassName = undefined;

        if (this.state.activeTab === "leftTab" || categoryMode === true) {
            listClassName = "LeaderboardListItemList";
            list = this.renderLeaderBoardList();
        } else {
            listClassName = "LeaderboardCategoryList";
            list = this.renderLeaderBoardCategoryList();
        }

        return (
            <div className="LeaderboardPane">
                <HeaderBar
                    primaryText="Leaderboard"
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                <div className="TabBar">
                    <ChangeCategoryButton
                        className = "Left"
                        shouldHide = {shouldHide}
                        onClick = {this.onClickChangeCategory}
                        children = "Change Category"
                    />
                    <LeaderboardTab
                        className= "Middle"
                        leftTabContent="All"
                        rightTabContent="Categories"
                        activeTab={this.state.activeTab}
                        switchTab={this.switchTab}
                    />
                    <div className="Right"/>
                </div>
                <div className={listClassName}>
                    {list}
                </div>
            </div>
        );
    }

    /**
     * This function is used for LeaderboardListItem Component.
     * After click the item, the page will be routed to service detail page.
     * @param {?Object} data - A Service object
     * @returns {void}
     */
    onClickLeaderboardListItem(data: Object): void {
        let slug = data.service_slug;
        let path = "/service/";

        path += slug;
        this.context.router.push(
            path,
        );
    }

    /**
     * This function is used to render the leaderboard list for services.
     * @returns {React.Component} The leaderboard list component
     */
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
            <div className="List categories">
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
