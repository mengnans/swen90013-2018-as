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
        sortState: boolean,
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
            return ascending ? (service2.claps - service1.claps)
                : (service1.claps - service2.claps);
        })
    }
    render() {

        /**
         * The list of non-crisis services.
         * @type {Array<Object>}
         * @var
         */
        let nonCrisisServices = this.nonCrisisResults();

        if (this.props.sortState) {
            this.sortClaps(nonCrisisServices, true);
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

    renderCrisisResult(object: Object, index: number) {
        const elem: React$Element<any> = object.staticText ?
            <StaticTextLine object={object} />
          : <CrisisLineItem object={object} />;

        return (
            <div
                key={`crisis-${index}`}
                className={className(elem)}
            >
                {elem}
            </div>
        );
    }

    renderResult(object: Object, index: number) {
        const elem = <ResultListItem object={object} />;

        return (
            <div
                key={`regular-${index}`}
                className={className(elem)}
            >
                {elem}
            </div>
        );
    }
}

export default ResultsList;
