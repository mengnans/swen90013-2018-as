/* @flow */

import React from "react";
import icons from "../icons";
import type { Service } from "../iss";
import {ThemeProvider} from 'styled-components'

import ClapButton from './ClapButton'
import ClapCount from './ClapCount'
import ClapCountTotal from './ClapCountTotal'
import iss from "../iss";
import Storage from '../storage'

const defaultTheme = {
    size: 35,
}

const expireTime = 60 * 60 * 24 * 1000;
const tlDuration = 300
const triangleBurstDelay = 30;
const triangleBurstCount = 5;
const circleBurstDelay = 30;


export default class Clap extends React.Component {
    props:{
        count: number,
        isClicked: boolean,
        service: Service,
    }

    static defaultProps = {
        countTotal: 0,
        count: 0,
        isClicked: false,
    };
    constructor(props) {
        super(props);
        let id = this.props.service.id;
        let clickState = Storage.hasClapped(id, expireTime);

        this.state = {
            unclicked: true,
            count: this.props.count,
            countTotal: this.props.service.clapNum,
            isHover: false,
            isClicked: clickState,
            id: id,
        };

        this.onClick = this.onClick.bind(this);
    }



    componentDidMount() {

        const mojs = require('mo-js');
        const triangleBurst = this.initTriangleBurst();
        const circleBurst = this.initCircleBurst();
        const countAnimation = this.initCountAnimation();
        const countTotalAnimation = this.initCountTotalAnimation();
        const scaleButton = this.initScaleButton();
        const clap = document.getElementById('clap');

        clap.style.transform = 'scale(1, 1)';
        this.animationTimeline = new mojs.Timeline()
        this.animationTimeline.add([
            countAnimation,
            countTotalAnimation,
            scaleButton,
            circleBurst,
            triangleBurst,
        ]);
    }

    initScaleButton(): mojs.Html {
        return new mojs.Html({
            el: '#clap',
            duration: tlDuration,
            scale: {1.3: 1},
            easing: mojs.easing.out,
        });
    }

    initTriangleBurst(): mojs.Burst {
        return new mojs.Burst({
            parent: '#clap',
            radius: {20: 30},
            count: triangleBurstCount,
            angle: 30,
            children: {
                shape: 'polygon',
                radius: {5: 0},
                scale: 1,
                stroke: 'rgba(211,84,0 ,0.5)',
                strokeWidth: 2,
                angle: 210,
                delay: triangleBurstDelay,
                speed: 0.2,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                duration: tlDuration,
            },
        });
    }


    initCircleBurst(): mojs.Burst {
        return new mojs.Burst({
            parent: '#clap',
            radius: {50: 75},
            angle: 25,
            duration: tlDuration,
            children: {
                shape: 'circle',
                fill: 'rgba(149,165,166 ,0.5)',
                delay: circleBurstDelay,
                speed: 0.2,
                radius: {3: 0},
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            },
        });
    }

    initCountAnimation(): mojs.Burst {
        return new mojs.Html({
            el: '#clap-count',
            isShowStart: false,
            isShowEnd: true,
            y: {0: -30},
            opacity: {0: 1},
            duration: tlDuration,
        }).then({
            opacity: {1: 0},
            y: -80,
            delay: tlDuration / 2,
        });
    }


    initCountTotalAnimation(): mojs.Burst {
        const opacityStart = 1

        return new mojs.Html({
            el: '#clap-count-total',
            isShowStart: false,
            isShowEnd: true,
            opacity: {[opacityStart]: 1},
            delay: 3 * tlDuration / 2,
            duration: tlDuration,
            y: {0: -3},
        });
    }


    getTheme() {
        const {theme = {}} = this.props

        return Object.assign({}, defaultTheme, theme)
    }


    onClick() {
        const {id} = this.state

        let clickState = Storage.hasClapped(id, expireTime);

        this.setState(({count, countTotal}) => {
            if (!clickState) {
                Storage.setClapped(id, true);
                this.animationTimeline.replay();
                iss.increaseClap(this.props.service.id);
                return {
                    unclicked: false,
                    count: 1,
                    countTotal: countTotal + 1,
                    isClicked: true,
                }
            } else {
                Storage.setClapped(id, false);
                iss.decreaseClap(this.props.service.id);
                return {
                    unclicked: true,
                    count: 0,
                    countTotal: countTotal - 1,
                    isClicked: false,
                }
            }


        });
    }






    render() {

        return (
            <div>
                {this.renderClaps()}
            </div>
        );
    }

    renderClaps() {
        const {count, countTotal, isClicked, isHover} = this.state

        return (
            <div>
                <h4>Clap for This Wonderful Service:</h4>
                <br/>
                <div className="Clap">
                    <ThemeProvider theme={this.getTheme()}>
                        <ClapButton
                            id="clap"
                            onClick={this.onClick}
                            onMouseEnter={
                                event => this.setState({isHover: true})
                            }
                            onMouseLeave={
                                event => this.setState({isHover: false})
                            }
                            isHover={isHover && !isClicked}
                        >
                            <icons.Clap id="clap-icon"
                                className="ColoredIcon"
                                isClicked={isClicked}
                            />

                            <ClapCount id="clap-count">
                                +{count}
                            </ClapCount>

                            <ClapCountTotal id="clap-count-total">
                                {Number(countTotal).toLocaleString()}
                            </ClapCountTotal>

                        </ClapButton>
                    </ThemeProvider>
                </div>

            </div>
        );
    }
}
