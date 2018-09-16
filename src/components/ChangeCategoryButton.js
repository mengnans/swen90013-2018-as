/* @flow */

import React from "react";
import classnames from "classnames";

/**
 * Change category Button
 * a button to return from category leaderboard to category list
 * @param {React.PropTypes.func} onClick The state change function
 */
export default class ChangeCategoryButton extends React.Component {
    props: {
        onClick: Function,
        className?: string,
        children?: any,
        shouldHide: boolean,
    };
    static propTypes = {
        onClick: React.PropTypes.func,
    };


    render() {
        const {
            onClick,
            className,
            children,
            shouldHide,
        } = this.props;

        let hiddenClass = shouldHide ? "hidden" : null;

        return (
            <div className ={classnames("ChangeCategoryButton",
                   className)}>
                <button
                    className={hiddenClass}
                    onClick= {onClick}
                >
                    {children}
                </button>
            </div>
        )
    }
}
