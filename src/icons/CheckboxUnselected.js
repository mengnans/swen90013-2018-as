/* @flow */
/* jscs: disable */
import React from "react";
import mui from "material-ui";

export default class SvgIconCheckboxUnselected extends React.Component {

    render(): React.Component {
        return (
            <mui.SvgIcon
                {...this.props}
                viewBox="0 0 64 64"
            >
            <path d='M44.381,47.476H20.086c-1.964,0-3.562-1.597-3.562-3.561V19.619c0-1.707,1.388-3.095,3.095-3.095     h24.762c1.707,0,3.095,1.388,3.095,3.095v24.762C47.476,46.088,46.088,47.476,44.381,47.476z M19.619,18.724     c-0.493,0-0.896,0.402-0.896,0.896v24.296c0,0.75,0.611,1.361,1.362,1.361h24.295c0.493,0,0.896-0.402,0.896-0.896V19.619     c0-0.493-0.402-0.896-0.896-0.896H19.619z' />
            </mui.SvgIcon>
        );
    }

}
