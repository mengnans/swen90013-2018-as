/* @flow */
// FIXME: Test for transport time showing suburb

import React from "react";
import { titleize } from "underscore.string";

import fixtures from "../../fixtures/services";
import icons from "../icons";
import Location from "../iss/Location";

class TransportTime extends React.Component {
    // flow:disable not supported yet
    static propTypes = {
        compact: React.PropTypes.bool,
        location: React.PropTypes.object.isRequired,
    };

    // flow:disable not supported yet
    static sampleProps = {
        compact: {
            location: new Location(fixtures.ixa.location),
            compact: true,
        },
        expanded: {
            location: new Location(fixtures.ixa.location),
            compact: false,
        },
    };

    // flow:disable not supported yet
    static defaultProps = {
        compact: false,
    };

    // flow:disable not supported yet
    get compactClass(): string {
        return this.props.compact ? "compact" : "";
    }

    render(): ReactElement {
        if (this.props.location.isConfidential()) {
            return this.renderConfidential()
        } else {
            return this.renderPublic()
        }
    }

    renderConfidential(): ReactElement {
        /* This is a confidential location, we can't show any
         * transport time*/
        return (
            <div
                className={`TransportTime ${this.compactClass}`}
            >
                <icons.Phone className="ColoredIcon brand-text-dark" />
                <span className="travel-time">
                    Confidential location
                </span>&nbsp;
            </div>
        );
    }

    renderPublic(): ReactElement {
        return (
            <div
                className={`TransportTime ${this.compactClass}`}
            >
                <icons.Walk className="ColoredIcon" />
                <span className="travel-time">
                    ? mins
                </span>&nbsp;
                {this.renderSuburb()}
                {this.renderDirections()}
            </div>
        );
    }

    renderDirections(): ReactElement {
        if (!this.props.compact) {
            return (
                <div className="getDirections">
                    Get directions
                </div>
            );
        }
        return <span />;
    }

    renderSuburb(): ReactElement {
        if (this.props.compact) {
            return (
                <span className="location">
                    {titleize(this.props.location.suburb)}
                </span>
            );
        } else {
            return (
                <span></span>
            )
        }
    }
}

export default TransportTime;
