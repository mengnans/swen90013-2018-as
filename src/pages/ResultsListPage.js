/* @flow */

import React from "react";
import _ from "underscore";

import ResultsList from "../components/ResultsList";
import LoadingResultsHeader from
        "../components/ResultsListPage/LoadingResultsHeader";
import ViewOnMapButton from "../components/ViewOnMapButton";
import SortDropdown from "../components/SortDropdown";
import sendEvent from "../google-tag-manager";
import storage from "../storage";
import type {Service} from "../iss";

type SearchOrCategory = { search: string } | { title: string };

class ResultsListPage extends React.Component {
    props: {
        loadMore: any,
        objects: Array<Service>,
        location: any,
        personalisationComponents: Array<Object>,
        title: string,
        statusCode: number,
        meta: { total_count: number },
        loading: boolean,
        error: string,
    } & SearchOrCategory;
    state: {
        sort: boolean,
    };
    constructor(props) {
        super(props);
        this.state = {sort: false};
    }
    setSort(sort) {
        console.log(sort);
        this.setState({
            sort: sort,
        });
    }

    static propTypes = {
        objects: React.PropTypes.array,
    };

    recordMapClick(): void {
        if (this.props.search) {
            sendEvent({
                event: "ViewOnMap",
                search: this.props.search,
                location: storage.getLocation(),
            });
        } else if (this.props.category) {
            sendEvent({
                event: "ViewOnMap",
                category: this.props.category,
                location: storage.getLocation(),
            });
        }

    }

    render() {
        const path = this.props.location.pathname.replace(/\/?$/, "/map");

        return (
            <div className="ResultsListPage">
                <LoadingResultsHeader {...this.props} />
                <div className="List results">
                    {
                        _.isEmpty(this.props.objects) ||
                        <ViewOnMapButton
                            to={path}
                            onClick={this.recordMapClick.bind(this)}
                        />
                    }
                    <SortDropdown
                        changeSort={this.setSort.bind(this)}
                    />
                    <ResultsList
                        results={this.props.objects || []}
                        sortState={this.state.sort}
                    />
                    {this.props.loadMore}
                </div>
            </div>
        );
    }

}

export default ResultsListPage;
