/* @flow */
/* eslint-disable max-len */

import React from "react";
import iss from "../iss";
import type {Service} from "../iss";
import components from "../components";
import Loading from "../icons/Loading";
import config from "../config";

class LeaderBoardPage extends React.Component {

    state: {
        object?: Service,
        error?: Object,
    };

    static propTypes = {
        params: React.PropTypes.object,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            width: 0,
        };
    }

    componentDidMount(): void {
        this.loadLeaderboard();
    }

    componentDidUpdate(prevProps: Object, prevState: Object): void {
        if (prevProps.params.slug != this.props.params.slug) {
            this.loadLeaderboard();
        }
    }

    async loadLeaderboard(): Promise<void> {
        // Unload previous service
        this.setState({object: undefined});

        // TODO: update new front-backend communication here
        try {
            let object = await iss.getService(this.id);
            let feedback = await iss.getFeedback(this.id);

            object.feedback = feedback;

            this.setState({object});
        } catch (error) {
            this.setState({error});
        }

    }

    render() {
        let {
            object,
            error,
        } = this.state;
        const back = () => this.context.router.goBack();


        // TODO: fix later
        if (!true) {
            return (
                <div className="ServicePage">
                    <components.AppBar
                        title="Loading..."
                        onBackTouchTap={back}
                    />

                    <div className="ServicePane">
                        <main>
                            {
                                error ?
                                    <div className="error">
                                        <p>
                                            Sorry, I was unable to retrieve the information for this service at this
                                            time.
                                            Please try viewing another service or contact us
                                            if the problem persists at&nbsp;
                                            <a href={"mailto:" + config.default.siteMail}>{config.default.siteMail}</a>.
                                        </p>
                                        <p>
                                            {
                                                error.statusCode ?
                                                    "(error: " + error.statusCode + ")"
                                                    : ""
                                            }
                                        </p>
                                    </div>
                                    : <div className="progress">
                                        <Loading className="big"/>
                                    </div>
                            }
                        </main>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="LeaderBoardPage">
                    <components.AppBar
                        title={"Leader board"}
                        onBackTouchTap={back}
                    />
                    <div>
                        leader board
                    </div>
                </div>
            );
        }
    }

}

export default LeaderBoardPage;
