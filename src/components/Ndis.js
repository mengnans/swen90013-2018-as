/* @flow */

import React from "react";
import iss from "../iss";
import fixtures from "../../fixtures/services";
import Spacer from "./Spacer";

export default class Ndis extends React.Component {
    props: {
        object: iss.Service,
        compact?: boolean,
        spacer?: boolean,
    };
    state: void;

    static sampleProps = {default: {
        object: new iss.Service(fixtures.ixa),
        compact: true,
        spacer: false,
    }};

    render() {
        let ndisApproved = this.props.object.ndis_approved;

        if (ndisApproved) {
            if (this.props.compact) {
                return (
                    <div className="NdisCompact">
                        Part of NDIS
                    </div>
                );
            }
            return (
                <div>
                    <div className="Ndis">
                        Part of National Disability Insurance Scheme
                    </div>
                    {this.props.spacer ? <Spacer /> : ""}
                </div>
            );
        }
        return null;
    }
}
