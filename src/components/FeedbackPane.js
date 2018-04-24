/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";

export default class FeedbackPane extends React.Component {
    props: {
        service: Service,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            isProvidingAccessibilityFeedback: false,
            ratings: null,
        };
    }

    onClickAccessibilityFeedback(): void {

    }

    onClickGeneralFeedback(): void {

    }


    render() {
        return (

            <div className="FeedbackButton">
                <FlatButton label={"Provide Accessibility Feedback"}
                            onClick={this.onClickAccessibilityFeedback.bind(this)}/>
                <br/>
                <br/>
                <FlatButton label={"Provide General Feedback"}
                            onClick={this.onClickGeneralFeedback.bind(this)}/>
            </div>

        );
    }
}
