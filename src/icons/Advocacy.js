/* @flow */
/* Generated by ./script/iconify */
/* eslint-disable max-len */

import React from "react";
import classnames from "classnames";

export default class SvgIconAdvocacy extends React.Component {
    props: {
        className?: string,
    };
    state: void;

    render() {
        const {className, ...rest} = this.props;
        const classes = classnames(
            "AdvocacyIcon",
            "disallow-override-color",
            "Icon",
            "SvgIcon",
            className
        );

        return (
            <span
                {...rest}
                dangerouslySetInnerHTML={{__html: `
                    <svg class='${classes}' viewbox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title>advocacy</title><g data-name="Layer 2" id="Layer_2"><g data-name="Layer 1" id="Layer_1-2"><rect height="64" fill="none" width="64"></rect><path d="M45,9.68,19.86,8.06A12.62,12.62,0,0,0,6.46,19.84L5.58,33.46A12.61,12.61,0,0,0,16.75,46.8l-1,10.72,14.66-9.81,12.09.78A12.62,12.62,0,0,0,55.93,36.71l.88-13.62A12.62,12.62,0,0,0,45,9.68Z" fill="#9cd6e5"></path><path d="M27.26,18.87a1.15,1.15,0,0,1,1-1.48l2.29-.23a1.18,1.18,0,0,1,1.29,1.25l.2,13.1A1.17,1.17,0,0,1,31,32.77a1.15,1.15,0,0,1-1.26-1ZM31.19,35.1a2.19,2.19,0,0,1,2.48,2l0,.32a2.27,2.27,0,0,1-4.52.46l0-.32A2.21,2.21,0,0,1,31.19,35.1Z" fill="#37474f"></path></g></g></svg>
                `}}
            />
        );
    }
}
