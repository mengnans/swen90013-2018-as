/* @flow */

import React from "react";
import classnames from "classnames";

export default class FlatButton extends React.Component {
    props: {
        label: string,
        className?: string,
        onClick: Function,
        disabled?: boolean,
        iconType?: string,
        children?: any,
    };
    state: void;
    static propTypes = {
        disabled: React.PropTypes.bool,
        label: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
    };

    static sampleProps = {
        default: {
            label: "Button Text",
        },
    };

    render() {
        let {
            className,
            children,
            label,
            iconType,
            ...rest,
        } = this.props;

        if(iconType == "accessibility_feedback") {
            return (
                <button
                    className={classnames("FlatButton", className)}
                    {...rest}
                >
                    <div className={"RatingListItemIcon"}>
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 31.200000 36.000000" preserveAspectRatio="xMidYMid meet"><metadata>Created by potrace 1.13, written by Peter Selinger 2001-2015</metadata><g transform="translate(0.000000,36.000000) scale(0.080000,-0.080000)" fill="#ffffff" stroke="none"> <path d="M117 414 c-11 -11 -8 -49 5 -62 9 -9 9 -15 0 -24 -7 -7 -12 -22 -12 -34 0 -14 -8 -25 -20 -29 -38 -12 -70 -63 -70 -112 0 -38 5 -50 34 -79 28 -28 42 -34 75 -34 61 0 96 22 116 72 15 39 18 41 27 23 6 -11 17 -27 25 -37 14 -15 16 -15 44 0 32 19 33 35 2 40 -11 2 -30 20 -42 42 -21 37 -25 40 -67 40 -24 0 -44 5 -44 10 0 6 14 10 30 10 20 0 30 5 30 15 0 10 -10 15 -30 15 -25 0 -30 4 -30 23 0 13 -5 28 -11 34 -8 8 -7 17 3 32 9 16 10 26 2 39 -11 18 -54 28 -67 16z m5 -231 c6 -7 27 -13 48 -13 46 0 51 -5 38 -41 -12 -34 -35 -49 -77 -49 -68 0 -100 89 -48 134 21 18 22 18 26 0 2 -11 8 -25 13 -31z"/></g></svg></div>
                    <div className={"RatingListItemText"}>
                        {label}
                        {children}
                    </div>
                </button>
            )
        }

        if (iconType == "general_feedback") {
            return (
                <button
                    className={classnames("FlatButton", className)}
                    {...rest}
                >
                    <div className={"RatingListItemIcon"}> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 34.400000 25.600000" preserveAspectRatio="xMidYMid meet"><metadata>Created by potrace 1.13, written by Peter Selinger 2001-2015</metadata><g transform="translate(0.000000,25.600000) scale(0.080000,-0.080000)" fill="#ffffff" stroke="none"><path d="M27 293 c-13 -12 -8 -248 5 -261 17 -17 349 -17 366 0 17 17 17 239 0 256 -13 13 -359 18 -371 5z m343 -43 c0 -5 -4 -10 -8 -10 -5 0 -40 -20 -79 -45 l-71 -46 -81 52 c-45 28 -81 53 -81 55 0 2 72 4 160 4 100 0 160 -4 160 -10z m-234 -95 c38 -24 72 -45 76 -45 4 0 39 20 77 45 38 25 72 45 75 45 3 0 6 -31 6 -70 l0 -70 -160 0 -160 0 0 70 c0 39 4 70 8 70 5 0 40 -20 78 -45z"/> </g></svg></div>
                        <div className={"RatingListItemText"}>
                        {label}
                        {children}
                    </div>
                </button>
            )
        }

        if (iconType == " ") {
            return (
                <button
                    className={classnames("FlatButton", className)}
                    {...rest}
                >
                    <div className={"RatingListItemText"}>
                        {label}
                        {children}
                    </div>
                </button>
            )
        }


    }
}
