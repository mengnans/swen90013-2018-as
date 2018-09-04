/* @flow */
/* Generated by ./script/iconify */
/* eslint-disable max-len */

import React from "react";
import classnames from "classnames";

export default class SvgIconDown extends React.Component {
    props: {
        className?: string,
    };
    state: void;

    render() {
        const {className, ...rest} = this.props;
        const classes = classnames(
            "DownIcon",
            "disallow-override-color",
            "Icon",
            "SvgIcon",
            className
        );

        return (
            <span
                {...rest}
                dangerouslySetInnerHTML={{__html: `
                    <svg class='${classes}' version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.000000 15.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,15.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M26 98 c4 -7 16 -23 27 -35 20 -22 21 -22 40 -6 10 10 23 26 28 35 9 16 4 18 -46 18 -42 0 -54 -3 -49 -12z"></path></g></svg>
                `}}
            />
        );
    }
}
