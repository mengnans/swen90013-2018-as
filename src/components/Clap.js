/* @flow */

import React from "react";
import icons from "../icons";
import type { Service } from "../iss";
import {ThemeProvider} from 'styled-components'

import ClapWrap from './ClapWrap'
import ClapButton from './ClapButton'
import ClapCount from './ClapCount'
import ClapCountTotal from './ClapCountTotal'
import ClapIcon from './ClapIcon'
const defaultTheme = {
    primaryColor: 'rgb(0, 0, 0)',
    secondaryColor: 'rgb(20, 20, 20)',
    size: 35
}

export default class Clap extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            unclicked: true,
            count: this.props.count,
            countTotal: this.props.countTotal,
            isClicked: props.count > 0,
            isHover: false
        }
        this.onClick = this.onClick.bind(this)
        this.onClickClear = this.onClickClear.bind(this)
    }

    props:{
        countTotal: number,
        count: number,
        maxCount: number,
        isClicked: boolean,
        iconComponent: icons.Clap
    }

    static defaultProps = {
        countTotal: 0,
        count: 0,
        maxCount: 50,
        isClicked: false,
        iconComponent: icons.Clap
    };

    componentDidMount () {
        const tlDuration = 300
        const mojs = require('mo-js');
        const triangleBurst = new mojs.Burst({
            parent: '#clap',
            radius: {20: 30},
            count: 5,
            angle: 30,
            children: {
                shape: 'polygon',
                radius: {5: 0},
                scale: 1,
                stroke: 'rgba(211,84,0 ,0.5)',
                strokeWidth: 2,
                angle: 210,
                delay: 30,
                speed: 0.2,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                duration: tlDuration
            }
        });

        const circleBurst = new mojs.Burst({
            parent: '#clap',
            radius: {50: 75},
            angle: 25,
            duration: tlDuration,
            children: {
                shape: 'circle',
                fill: 'rgba(149,165,166 ,0.5)',
                delay: 30,
                speed: 0.2,
                radius: {3: 0},
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
        });

        const countAnimation = new mojs.Html({
            el: '#clap--count',
            isShowStart: false,
            isShowEnd: true,
            y: {0: -30},
            opacity: {0: 1},
            duration: tlDuration
        }).then({
            opacity: {1: 0},
            y: -80,
            delay: tlDuration / 2
        });

        const opacityStart = 1

        const countTotalAnimation = new mojs.Html({
            el: '#clap--count-total',
            isShowStart: false,
            isShowEnd: true,
            opacity: {[opacityStart]: 1},
            delay: 3 * tlDuration / 2,
            duration: tlDuration,
            y: {0: -3}
        });



        const scaleButton = new mojs.Html({
            el: '#clap',
            duration: tlDuration,
            scale: {1.3: 1},
            easing: mojs.easing.out
        });

        const clap = document.getElementById('clap')
        clap.style.transform = 'scale(1, 1)'
        this.animationTimeline = new mojs.Timeline()
        this.animationTimeline.add([
            countAnimation,
            countTotalAnimation,
            scaleButton,
            circleBurst,
            triangleBurst
        ]);
    }

    getTheme () {
        const {theme = {}} = this.props
        return Object.assign({}, defaultTheme, theme)
    }


    onClick () {
        const {maxCount} = this.props
        this.animationTimeline.replay();

        this.setState(({count, countTotal}) => {
            if (count < maxCount) {
                return {
                    unclicked: false,
                    count: 1,
                    countTotal: countTotal + 1,
                    isClicked: true
                }
            }
        });
    }

    onClickClear () {
        this.setState(({count, countTotal}) => {
            return {
                isClicked: false,
                countTotal: countTotal - count,
                count: 0
            }
        })
    }





    render() {
        const claps = this.props.numberOfClaps;

        return (
            <div>
                {this.renderClaps(claps)}
            </div>
        );
    }

    renderClaps(claps){
        const {count, countTotal, isClicked, isHover} = this.state
        let numberOfClaps = this.props.numberOfClaps;
        return (
            <div>
                <h4>Clap for This Wonderful Service:</h4>
                <br/>
                <div className="Clap">
                    <ThemeProvider theme={this.getTheme()}>

                        <ClapButton
                            id="clap"
                            onClick={this.onClick}
                            onMouseEnter={e => this.setState({isHover: true})}
                            onMouseLeave={e => this.setState({isHover: false})}
                            isHover={isHover && count === 0}
                        >

                            <ClapIcon id='clap--icon' className="ColoredIcon" isClicked={isClicked} />

                            <ClapCount id='clap--count'>
                                +{count}
                            </ClapCount>

                            <ClapCountTotal id='clap--count-total'>
                                {Number(countTotal).toLocaleString()}
                            </ClapCountTotal>

                        </ClapButton>
                    </ThemeProvider>
                </div>

            </div>
        );
    }
}
