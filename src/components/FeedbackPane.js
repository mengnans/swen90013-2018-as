/* @flow */

import React from "react";
import type {Service} from "../iss";

export default class FeedbackPane extends React.Component {
    props: {
        service: Service,
    };

    constructor(props: Object) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div>
                FeedbackPane
            </div>
        );
    }
}
