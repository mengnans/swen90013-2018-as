/* @flow */
/* jscs: disable */
import React from "react";
import mui from "material-ui";

export default class SvgIconChevron extends React.Component {

    render(): React.Component {
        return (
            <mui.SvgIcon
                {...this.props}
                viewBox="0 0 64 64"
            >
            <path d='M26.071,44.957c-0.281,0-0.563-0.107-0.777-0.322c-0.43-0.429-0.43-1.126,0-1.555l11.08-11.081    L25.294,20.92c-0.43-0.43-0.43-1.127-0.001-1.556c0.43-0.43,1.126-0.429,1.556-0.001l11.858,11.857    c0.207,0.207,0.322,0.486,0.322,0.778s-0.115,0.571-0.322,0.777L26.848,44.635C26.634,44.85,26.352,44.957,26.071,44.957z' />
            </mui.SvgIcon>
        );
    }

}
