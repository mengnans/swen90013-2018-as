/* @flow */

import React from "react";
import HeaderBar from "./HeaderBar";

export default class LeaderBoardPane extends React.Component {

    render() {
        return (
            <div className={"LeaderBoardPane"}>
                <HeaderBar
                    primaryText={"Leader board"}
                    secondaryText={null}
                    bannerName="housing"
                    alternateBackgroundColor={false}
                />
                leader board
            </div>
        );
    }
}
