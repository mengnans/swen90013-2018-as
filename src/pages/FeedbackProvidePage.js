/* @flow */
/* eslint-disable max-len */

import React from "react";
import FeedackProvidePane from "../components/FeedbackProvidePane";

import iss from "../iss";
import type {Service} from "../iss";
import components from "../components";
import Loading from "../icons/Loading";
import config from "../config";

/**
 * The page that allows users to submit feedback on a service.
 */
class FeedbackProvidePage extends React.Component {
    props: {
        /**
         * The parameters passed through React Router.
         * @type {object}
         */
        params: {
            /**
             * The service slug (i.e community-lunch-centre)
             * @type {string}
             */
            slug: string,
        },
    };

    state: {
        /**
         * The service the user will be providing feedback on.
         *
         * @type {Service}
         */
        object?: Service,

        /**
         * The error object. This will be set if there is an error whilst
         * retrieving the service.
         *
         * @type {object}
         */
        error?: Object,
    };

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    /**
     * @override
     */
    constructor(props: Object) {
        super(props);
        this.state = {
            width: 0,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    /**
     * Loads the service and updates the window dimensions one time when
     * this component mounts.
     *
     * Also registers an event listener that will be run every time the
     * window is resized in the future.
     * @override
     */
    componentDidMount(): void {
        this.loadService();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    /**
     * Loads the service and updates the window dimensions one time when
     * this component mounts.
     *
     * Also un-registers the event listener that runs on window resize.
     * @override
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    /**
     * Updates the window width in the state.
     * @returns {undefined}
     */
    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth,
        });
    }

    /**
     * Loads the service if a different service slug is detected in
     * the URL.
     * @override
     */
    componentDidUpdate(prevProps: Object, prevState: Object): void {
        if (prevProps.params.slug != this.props.params.slug) {
            this.loadService();
        }
    }

    /**
     * Pull out the ID (leading digits) from the slug.
     *
     * @return {number} The id of the service.
     */
    get id(): number {
        const leadingDigits = /^\d+/;
        let slug = this.props.params.slug;
        let match = slug.match(leadingDigits);

        if (match) {
            return parseInt(match[0]);
        }
        throw new Error("Bad URL (/service/[service-id must be a number]")
    }

    /**
     * Loads the service associated with the id of the sug passed to
     * this component. Also requests the feedback and attaches it to the
     * Service object.
     *
     * @return {undefined}
     */
    async loadService(): Promise<void> {
        // Unload previous service
        this.setState({object: undefined});

        try {
            let object = await iss.getService(this.id);
            let feedback = await iss.getFeedback(this.id);

            object.feedback = feedback;

            this.setState({object});
        } catch (error) {
            this.setState({error});
        }

    }

    /**
     * @override
     */
    render() {
        let {
            object,
            error,
            width,
        } = this.state;
        const back = () => this.context.router.goBack();

        if (!object) {
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
                <div className="ServicePage">
                    <components.AppBar
                        title={object.site.name}
                        onBackTouchTap={back}
                    />
                    <FeedackProvidePane
                        service={object}
                        width={width}
                        location={this.props.location}
                    />
                </div>
            );
        }
    }

}

export default FeedbackProvidePage;
