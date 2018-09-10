/* @flow */

import React from "react";
import classnames from "classnames";

export default class ChangeCategoryButton extends React.Component {
    props: {
        onClick: Function,
        className?: string,
        children?: any
    };
    static propTypes = {
        onClick: React.PropTypes.func,
    };


    static sampleProps = {
        default: {
            children: "Change Category",
        },
    };


    render() {
        const {
            onClick,
            className,
            children,
        } = this.props;

        return (
            <div className ={classnames("ChangeCategoryButton",
                   className)}>
                <button
                    onClick= {onClick}
                >
                {children}
                </button>
            </div>
        )
    }
}
