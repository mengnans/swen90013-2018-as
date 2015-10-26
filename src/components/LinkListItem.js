/* @flow */

import React from "react";
import { Link } from "react-router";

export default class LinkListItem extends React.Component {
    // flow:disable not supported yet
    static propTypes = {
        primaryText: React.PropTypes.node,
        secondaryText: React.PropTypes.node,

        leftIcon: React.PropTypes.node,
        rightIcon: React.PropTypes.node,
    };

    // flow:disable not supported yet
    static defaultProps = {
        className: "",
    };

    // flow:disable not supported yet
    static sampleProps = {
        default: {
            primaryText: "Link Text",
            secondaryText: "Secondary Text",
            to: "example.com",
        },
    };

    render(): ReactElement {

        let {
            className,
            leftIcon,
            rightIcon,
            ...rest,
        } = this.props;

        let classes = [
            "ListItem",
            "plain-text",
            className,
        ];

        if (leftIcon) {
            classes.push("has-left-icon");
        }

        if (rightIcon) {
            classes.push("has-right-icon");
        }

        if (this.props.to.startsWith('mailto')) {
            // FIXME: react-router's <Link> can't handle the
            // 'mailto' scheme, because it tries to use pushstate.
            return (
                <a
                    className={classes.join(" ")}
                    href={this.props.to}
                    {...rest}
                >
                    {this.renderContent()}
                </a>
            );
        }

        return (
            <Link
                className={classes.join(" ")}
                {...rest}
            >
                {this.renderContent()}
            </Link>
        );
    }

    renderContent(): ReactElement {
        let {
            children,
            leftIcon,
            rightIcon,
            primaryText,
            secondaryText,
        } = this.props;

        return (
            <div>
                <div className="leftIcon">
                    {leftIcon}
                </div>
                {this.props.children ? null
                    : <div className="primaryText">
                        {primaryText}
                    </div>
                }
                {this.props.children ? null
                    : <div className="secondaryText">
                        {secondaryText}
                    </div>
                }
                {this.props.children}
                <div className="rightIcon">
                    {rightIcon}
                </div>
            </div>
        )
    }
}
