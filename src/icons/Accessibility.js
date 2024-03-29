/* @flow */
/* Generated by ./script/iconify */
/* eslint-disable max-len */

import React from "react";
import classnames from "classnames";

export default class SvgIconAccessibility extends React.Component {
    props: {
        className?: string,
        iconType?: string,
    };
    state: void;

    render() {
        const {className, iconType, ...rest} = this.props;
        const classes = classnames(
            "AccessibilityIcon",
            "allow-override-color",
            "Icon",
            "SvgIcon",
            className,
            iconType
        );

        if (iconType == "wheelChair" ) {
            return (
                <span
                    {...rest}
                    dangerouslySetInnerHTML={{
                        __html: `
                    <svg class='${classes}' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 573.445 573.445" enable-background="new 0 0 573.445 573.445"  xml:space="preserve"><g><g><path fill="#010002"  d="M174.727,79.56c-3.06-6.936-4.59-14.484-4.59-22.644c0-7.752,1.53-15.096,4.59-22.032 s7.14-12.954,12.24-18.054c5.1-5.1,11.118-9.18,18.054-12.24S219.505,0,227.665,0c7.752,0,15.096,1.53,22.032,4.59 s13.056,7.14,18.36,12.24s9.384,11.118,12.24,18.054s4.284,14.28,4.284,22.032c0,15.912-5.508,29.478-16.524,40.698 s-24.48,16.83-40.392,16.83c-8.16,0-15.708-1.53-22.644-4.59c-6.936-3.06-12.954-7.14-18.054-12.24 C181.867,92.514,177.787,86.496,174.727,79.56z M397.189,392.904c-6.936-1.633-13.157-0.611-18.665,3.061 s-9.078,8.771-10.71,15.301c-1.224,6.119-3.06,12.035-5.508,17.748c-5.304,14.279-12.75,27.336-22.338,39.168 s-20.605,22.033-33.048,30.6c-12.444,8.568-26.112,15.199-41.004,19.893c-14.892,4.689-30.294,7.037-46.206,7.037 c-20.808,0-40.392-3.875-58.752-11.627c-18.36-7.754-34.374-18.156-48.042-31.213c-13.668-13.059-24.48-28.459-32.436-46.205 c-7.956-17.748-11.934-36.824-11.934-57.225c0-15.096,2.346-29.682,7.038-43.758s11.322-27.133,19.89-39.168 c8.568-12.037,18.768-22.645,30.6-31.825c11.832-9.18,25.092-16.626,39.78-22.338c6.528-2.04,11.22-6.12,14.076-12.24 s3.06-12.24,0.612-18.36s-6.834-10.506-13.158-13.158c-6.324-2.652-12.75-2.958-19.278-0.918 c-19.176,7.344-36.72,17.136-52.632,29.376c-15.912,12.24-29.58,26.316-41.004,42.228s-20.196,33.25-26.316,52.02 c-6.12,18.767-9.18,38.146-9.18,58.14c0,26.93,5.304,52.121,15.912,75.582c10.608,23.459,24.99,43.961,43.146,61.506 c18.156,17.543,39.372,31.416,63.648,41.615c24.276,10.201,50.286,15.301,78.03,15.301c21.216,0,41.616-3.061,61.2-9.18 c19.583-6.121,37.739-14.791,54.468-26.01c16.727-11.219,31.416-24.787,44.062-40.699c12.648-15.912,22.44-33.455,29.376-52.631 c2.857-6.939,5.304-14.689,7.344-23.256c1.634-6.938,0.612-13.059-3.06-18.361C409.428,398.008,404.126,394.537,397.189,392.904z M551.412,486.541l-93.636-162.793c-3.264-6.938-8.161-12.445-14.688-16.525c-6.528-4.08-13.872-6.119-22.032-6.119h-104.04 l-12.24-59.976h81.398c4.895,0.408,9.588-0.408,14.076-2.448c4.485-2.04,7.953-5.304,10.401-9.792 c3.267-5.712,3.979-11.832,2.145-18.36c-1.836-6.528-5.815-11.424-11.937-14.688c-3.264-2.04-6.936-3.06-11.016-3.06H294.37 l-5.507-28.152c0-0.816-0.103-1.326-0.307-1.53s-0.307-0.714-0.307-1.53l-0.611-1.836c-2.856-9.384-8.262-17.136-16.218-23.256 s-17.238-9.18-27.846-9.18c-13.056,0-24.072,4.386-33.048,13.158c-8.976,8.772-13.464,19.278-13.464,31.518 c0,2.04,0.204,3.672,0.612,4.896h-0.612l33.66,162.18c1.632,9.385,6.12,17.035,13.464,22.951 c7.344,5.916,15.912,8.873,25.704,8.873c2.856,0,5.1-0.203,6.732-0.611h138.925l80.784,140.76 c2.446,5.303,6.118,9.588,11.016,12.854c4.896,3.264,10.609,4.896,17.136,4.896c8.16,0,15.198-2.854,21.114-8.568 c5.916-5.713,8.874-12.646,8.874-20.809C554.474,494.902,553.453,490.621,551.412,486.541z"></path></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                `,
                    }}
                />
            );
        }

        if (iconType == "signage") {
            return (
                <span
                    {...rest}
                    dangerouslySetInnerHTML={{
                        __html: `
                   <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="24px" height="24px" viewBox="0 0 132.000000 150.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,150.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M632 1402 c-7 -5 -21 -32 -32 -60 -19 -50 -20 -79 -20 -592 l0 -540
-33 0 c-56 0 -86 -50 -51 -84 12 -13 40 -16 139 -16 68 0 130 3 139 6 19 7 22
64 4 82 -7 7 -27 12 -45 12 l-33 0 0 545 c0 311 -4 553 -9 563 -5 9 -17 34
-26 55 -9 20 -17 37 -18 37 -1 0 -8 -4 -15 -8z"/>
<path d="M748 1209 c-15 -8 -18 -24 -18 -82 0 -44 5 -78 12 -85 8 -8 64 -12
184 -12 l172 0 51 40 c28 22 51 46 51 54 0 13 -35 47 -80 79 -21 14 -49 17
-190 17 -93 0 -173 -5 -182 -11z"/>
<path d="M123 1010 c-24 -21 -43 -42 -43 -46 0 -3 19 -24 41 -45 l42 -39 191
2 191 3 0 80 0 80 -190 3 -190 2 -42 -40z"/>
<path d="M748 909 c-15 -8 -18 -24 -18 -81 0 -56 4 -74 18 -84 12 -10 61 -13
184 -14 l167 0 38 33 c56 47 63 55 63 64 0 12 -59 68 -87 82 -28 14 -341 14
-365 0z"/>
</g>
</svg>
                    `,
                    }}
                />
            );
        }

        if (iconType == "publicTransport") {
            return (
                <span
                    {...rest}
                    dangerouslySetInnerHTML={{
                        __html: `
                   <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="24px" height="24px" viewBox="0 0 118.000000 144.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,144.000000) scale(0.100000,-0.100000)"
fill="#000000" stroke="none">
<path d="M190 1367 c-39 -18 -60 -39 -85 -82 -21 -37 -24 -62 -39 -320 -9
-154 -21 -346 -27 -426 -12 -170 -5 -207 47 -264 19 -19 52 -42 74 -51 l40
-16 -21 -37 c-29 -53 -23 -110 14 -131 24 -13 30 -13 54 0 14 8 47 49 72 90
l47 75 228 0 228 0 25 -45 c56 -100 77 -125 110 -128 24 -2 36 3 52 24 27 35
27 66 -3 113 l-25 39 32 13 c56 22 99 60 120 107 18 41 19 59 13 171 -26 511
-44 737 -61 776 -15 33 -57 76 -92 94 -31 16 -769 14 -803 -2z m757 -145 c6
-4 14 -18 17 -32 10 -38 25 -384 18 -391 -4 -4 -179 -10 -388 -14 -296 -5
-383 -4 -389 5 -18 29 8 419 29 432 14 10 698 10 713 0z m58 -696 c4 -63 4
-124 0 -135 -6 -21 -10 -21 -415 -21 -359 0 -409 2 -414 16 -3 8 -3 69 1 135
l6 119 407 0 408 0 7 -114z"/>
<path d="M265 557 c-26 -20 -26 -81 1 -102 30 -24 65 -14 87 23 20 33 20 34 0
60 -23 31 -60 39 -88 19z"/>
<path d="M834 545 c-11 -16 -14 -34 -9 -55 13 -58 76 -66 107 -15 17 30 17 32
-2 63 -25 41 -71 45 -96 7z"/>
</g>
</svg>
                    `,
                    }}
                />
            );

        }
    }
}
