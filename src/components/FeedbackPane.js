/* @flow */

import React from "react";
import type {Service} from "../iss";
import FlatButton from "./FlatButton";
import sendEvent from "../google-tag-manager";

export default class FeedbackPane extends React.Component {
    props: {
        service: Service,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props: Object) {
        super(props);
    }

    onClickProvideAccessibilityFeedback() : void {
        let path = "/service/";

        path += this.props.service.slug;
        path += "/feedback/provide";
        this.context.router.push(
            path
        )
    }

    recordSuggestChange(): void {
        sendEvent({
            event: "suggestServiceChange",
            service: this.props.service.id,
        });
    }

    render() {
        return (
            <div className="FeedbackPane">
                {this.renderFeedbackButtons()}
            </div>
        );
    }

    renderFeedbackButtons() {

        return (
            <div className={"ButtonPane"}>
                <FlatButton
                    className={"FeedbackButtonAccess"}
                    label={"Provide Accessibility Feedback"}
                    iconType = "accessibility_feedback"
                    onClick={this.onClickProvideAccessibilityFeedback.bind(this)}
                />
                <div className={"Separator"}/>
                <a
                    className="suggestChange"
                    onClick={this.recordSuggestChange.bind(this)}
                    href={
                        "mailto:database@infoxchange.org" +
                        "?subject=" +
                        encodeURIComponent(`Ask Izzy changes: ${this.props.service.id}`) +
                        "&body=" +
                        encodeURIComponent(
                            `Contact name:

                            Contact number:

                            Contact email:

                            Details of change:

                            `.replace(/^ +/gm, "")
                        )
                    }
                >
                    <FlatButton
                        className={"GeneralFeedbackButton"}
                        label={"Provide General Feedback"}
                        iconType = "general_feedback"
                    />
                </a>

            </div>

        );
    }
}
