/* @flow */
/* Generated by ./script/iconify */
/* eslint-disable max-len */

import React from "react";
import classnames from "classnames";

export default class SvgIconDemographicDisability extends React.Component {
    props: {
        className?: string,
    };
    state: void;

    render() {
        const {className, ...rest} = this.props;
        const classes = classnames(
            "DemographicDisabilityIcon",
            "allow-override-color",
            "Icon",
            "SvgIcon",
            className
        );

        return (
            <span
                {...rest}
                dangerouslySetInnerHTML={{__html: `
                    <svg class='${classes}' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" enable-background="new 0 0 64 64"  xml:space="preserve"><g id="demographic-disability"><g><path fill="#231F20"  d="M26.583,17.956c3.217,0,5.834-2.618,5.834-5.835S29.8,6.287,26.583,6.287s-5.835,2.617-5.835,5.834 S23.365,17.956,26.583,17.956z M26.583,9.287c1.563,0,2.834,1.271,2.834,2.834s-1.271,2.835-2.834,2.835s-2.835-1.272-2.835-2.835 S25.02,9.287,26.583,9.287z"></path><path fill="#231F20"  d="M35.824,45.398c0-5.565-3.824-10.393-8.824-11.863v-2.779c0-0.829-0.671-1.5-1.5-1.5 s-1.5,0.671-1.5,1.5V43.54c0,0.805-0.695,1.46-1.5,1.46S21,44.345,21,43.54V31.756c0-0.001,0-0.002,0-0.004v-4.44 C21,24.773,22.799,23,25.339,23h2.486c2.25,0,3.912,0.703,4.705,4.655l1.617,9.083C34.275,37.454,34.897,38,35.624,38h5.868 c0.988,0,1.792,0.725,1.792,1.713c0,0.033-0.044,0.027-0.042,0.06L44,51.756v0.248C44,52.832,44.763,54,45.591,54h6.044 c0.828,0,1.5-0.672,1.5-1.5s-0.672-1.5-1.5-1.5h-4.621l-0.729-11.094C46.255,37.289,44.116,35,41.492,35H36.88l-1.4-7.921 c-0.001-0.005-0.003-0.05-0.004-0.055c-0.001-0.005,0,0.078-0.001,0.073C34.507,22.262,32.006,20,27.825,20h-2.486 c-4.054,0-7.346,3-7.65,7h-4.804c-0.829,0-1.5,0.671-1.5,1.5s0.671,1.5,1.5,1.5H18v1.756v2.697c-4,2.125-6.846,6.295-6.846,10.945 c0,6.791,5.545,12.315,12.336,12.315C30.279,57.714,35.824,52.189,35.824,45.398z M14.154,45.398c0-2.962,0.846-5.653,3.846-7.394 v5.536c0,2.459,2.041,4.46,4.5,4.46s4.5-2.001,4.5-4.46v-6.856c3,1.348,5.824,4.788,5.824,8.714c0,5.137-4.198,9.315-9.335,9.315 C18.353,54.714,14.154,50.535,14.154,45.398z"></path></g></g><g id="Layer_1"></g></svg>
                `}}
            />
        );
    }
}
