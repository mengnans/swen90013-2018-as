/* @flow */

import React from "react";

import ResultListItem from "../components/ResultListItem";
import CrisisLineItem from "../components/CrisisLineItem";
import CrisisHeader from "../components/CrisisHeader";
import {
    crisisResults,
    nonCrisisResults,
} from "../iss";

const StaticTextLine = ({object}) => React.cloneElement(object.node);

const className = (elem: {type: {displayName?: string}}) =>
    `resultContainer resultContainer-${
        elem.type.displayName || "other"}`

class ResultsList extends React.Component {

    crisisResults(): Array<Object> {
        return crisisResults(this.props.results);
    }

    nonCrisisResults(): Array<Object> {
        return nonCrisisResults(this.props.results);
    }

    render(): ReactElement {
        return (
            <div className="ResultList">
                {
                    (this.crisisResults().length > 0) &&
                    <CrisisHeader
                        plural={this.crisisResults().length > 1}
                    />
                }
                {this.crisisResults().map(this.renderCrisisResult.bind(this))}
                {this.nonCrisisResults().map(this.renderResult.bind(this))}
            </div>
        );
    }

    renderCrisisResult(object: Object, index: number): ReactElement {
        const elem = object.staticText ?
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

    renderResult(object: Object, index: number): ReactElement {
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
