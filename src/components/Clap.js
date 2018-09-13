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

//the theme for clap button
const defaultTheme = {
    size: 35,
}

//defines the duration for the user to clap again.
const expireTime = 60 * 60 * 24 * 1000;

// defines the duration for claps motion
const tlDuration = 300


/*  defines the delay time for the element to show.
 *  after this time, the triangle element for
 *  clap component will show
 */
const triangleBurstDelayTime = 30;

//defines how many triangle elements exist for clap component
const triangleBurstCount = 5;

/*  defines the delay time for the element to show.
 *  after this time, the circle element for
 *  clap component will show
 */
const circleBurstDelayTime = 30;

/**
 * Mo-js placeholder variable.
 */
let mojs = undefined;

export default class Clap extends React.Component {
    props:{
        isClicked: boolean,
        service: Service,
    }

    static defaultProps = {
        countTotal: 0,
        isClicked: false,
    };
    constructor(props) {
        super(props);
        let id = this.props.service.id;
        let clickState = Storage.hasClapped(id, expireTime);
        let countTotal = isNaN(this.props.service.clapNum) ?
              (clickState ? 1 : 0)
            : this.props.service.clapNum

        this.state = {
            unclicked: true,
            countTotal,
            isHover: false,
            isClicked: clickState,
            id: id,
        };

        this.onClick = this.onClick.bind(this);
    }



    componentDidMount() {

        /**
         * We need to require mo-js inside this method instead of at the
         * beginning of the file because it does not play nicely with SSR.
         */
        mojs = require('mo-js');

        const triangleBurst = this.initTriangleBurst();
        const circleBurst = this.initCircleBurst();
        const countAnimation = this.initCountAnimation();
        const countTotalAnimation = this.initCountTotalAnimation();
        const scaleButton = this.initScaleButton();

        this.animationTimeline = new mojs.Timeline()
        this.animationTimeline.add([
            countAnimation,
            countTotalAnimation,
            scaleButton,
            circleBurst,
            triangleBurst,
        ]);
    }

    /**
     * init clap scale button
     *
     * @returns {?mojs.Html} An object for mojs.
     */
    initScaleButton(): mojs.Html {
        return new mojs.Html({
            el: '#clap',
            duration: 0,
            scale: {1: 1.3},
            easing: mojs.easing.out,
        })
        .then({
            duration: tlDuration,
            scale: {1.3: 1},
            easing: mojs.easing.out
        });;
    }

    /**
     * init the triangle elements motion for clap component
     *
     * @returns {?mojs.Burst} An object for mojs.
     */
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
                delay: triangleBurstDelayTime,
                speed: 0.2,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                duration: tlDuration,
            },
        });
    }

    /**
     * init the circle elements motion for clap component
     *
     * @returns {?mojs.Burst} An object for mojs.
     */
    initCircleBurst(): mojs.Burst {
        return new mojs.Burst({
            parent: '#clap',
            radius: {50: 75},
            angle: 25,
            duration: tlDuration,
            children: {
                shape: 'circle',
                fill: 'rgba(149,165,166 ,0.5)',
                delay: circleBurstDelayTime,
                speed: 0.2,
                radius: {3: 0},
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
            },
        });
    }

    /**
     * init counting motion for clap component
     *
     * @returns {?mojs.Burst} An object for mojs.
     */
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

    /**
     * init counting motion for clap component
     *
     * @returns {?mojs.Burst} An object for mojs.
     */
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
                    countTotal: countTotal + 1,
                    isClicked: true,
                }
            } else {
                Storage.setClapped(id, false);
                iss.decreaseClap(this.props.service.id);
                return {
                    unclicked: true,
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
        const {countTotal, isClicked, isHover} = this.state

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
                                +1
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
