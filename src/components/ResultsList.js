/* @flow */

import React from "react";

import ResultListItem from "../components/ResultListItem";
import CrisisLineItem from "../components/CrisisLineItem";
import CrisisHeader from "../components/CrisisHeader";
import {
    crisisResults,
    nonCrisisResults,
} from "../iss";

import type { Service } from "../iss";

const StaticTextLine = ({object}) => React.cloneElement(object.node);

const className = (elem: React$Element<any>) =>
    `resultContainer resultContainer-${
        elem.type.displayName || "other"}`

class ResultsList extends React.Component {
    props: {
        results: Array<Service>,
        sort: boolean,
    };
    state: void;

    crisisResults(): Array<Object> {
        return crisisResults(this.props.results);
    }

    nonCrisisResults(): Array<Object> {
        return nonCrisisResults(this.props.results);
    }

    /**
     * Sort the list in terms of the number of claps.
     * @param {Array<Object>} services -- The list of services
     * @param {boolean} ascending -- Dictate sorting
     * in a ascending or descending order.
     * @return {void}
     */
    sortClaps(services : Array<Object>, ascending: boolean) : void {
        services.sort((service1, service2) => {
            return ascending ? (service1.claps - service2.claps)
                : (service2.claps - service1.claps);
        });
    }
    render() {

        /**
         * The list of non-crisis services.
         * @type {Array<Object>}
         * @var
         */
        let nonCrisisServices = this.nonCrisisResults();

        if (this.props.sort) {
            this.sortClaps(nonCrisisServices, false);
        }

        return (
            <div className="ResultList">
                {
                    (this.crisisResults().length > 0) &&
                    <CrisisHeader
                        plural={this.crisisResults().length > 1}
                    />
                }
                {this.crisisResults().map(this.renderCrisisResult.bind(this))}
                {nonCrisisServices.map(this.renderResult.bind(this))}
            </div>
        );
    }

    renderCrisisResult(object: Object) {
        const elem: React$Element<any> = object.staticText ?
            <StaticTextLine object={object} />
          : <CrisisLineItem object={object} />;
        const id = object.id;

        return (
            <div
                key={`crisis-${id}`}
                className={className(elem)}
            >
                {elem}
            </div>
        );
    }

    renderResult(object: Object) {
        const elem = <ResultListItem object={object} />;
        const id = object.id;

        return (
            <div
                key={`regular-${id}`}
                className={className(elem)}
            >
                {elem}
            </div>
        );
    }
}

export default ResultsList;
