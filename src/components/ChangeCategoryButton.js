/* @flow */

import React from "react";

/**
 * Change category Button
 * a button to return from category leaderboard to category list
 * @param onClick React.PropTypes.func The state change function
 */
export default class ChangeCategoryButton extends React.Component {
    props: {
        onClick: Function,
    };
    static propTypes = {
        onClick: React.PropTypes.func,
    };


    render() {
        const {
            onClick,
        } = this.props;

        return (
            <div className ={"ChangeCategoryButton"}>
                <button
                    onClick= {onClick}
                >
                {"Change Category"}
                </button>
            </div>
        )
    }
}
