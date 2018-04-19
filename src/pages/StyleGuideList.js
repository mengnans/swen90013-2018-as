/* @flow */

import React from "react";
import { Link } from "react-router";
import components from "../components";

export default class StyleGuideList extends React.Component {
    props: {};
    state: void;
    render() {
        return (
            <ul>
                {Object.keys(components).sort().map(this.renderItem)}
            </ul>
        );
    }

    renderItem(componentName: string) {
        return (
            <Link
                to={`/styleGuide/component/${componentName}`}
                key={componentName}
                style={{clear: "both", float: "left"}}
            >{componentName}</Link>
        );
    }
}
