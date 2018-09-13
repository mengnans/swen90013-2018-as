/* @flow */

import React from "react";
import classnames from "classnames";
import icons from "../icons";
import type{Service} from "../iss";


class ClapItemForResultList extends React.Component {
    props: {
        service: Service,
    };

    static defaultProps = {
        clapNum: 100,
    };

    constructor(props) {
        super(props);
        this.state = {
            //TODO: get data from back-end
            clapNum: this.props.service.clapNum,
        }
    }


    render() {
        return this.renderClap()
    }

    renderClap() {
        const {clapNum} = this.state;

        return (
            <div>
                <div className={classnames(
                    "ClapItemForResultList",
                    "compact"
                )}>
                    {this.renderClapItem(clapNum)}
                </div>
            </div>
        );
    }

    renderClapItem(clapNum: number) {

        return (
            <div
                className="clap-font"
            >
                <icons.Clap
                    className="ColoredIcon"
                    iconType="result-list-page"
                />
                {clapNum} claps given
            </div>
        );

    }

}

export default ClapItemForResultList;
