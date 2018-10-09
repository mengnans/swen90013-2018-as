/* flow:disable */

/* eslint-env node, mocha */
/* eslint-disable prefer-arrow-callback */

import 'babel-polyfill';
import './support/chai-jest-snapshot';
import './support/mock-mojs';
import Yadda from "yadda";

describe("Unit tests", function() {
    new Yadda.FileSearch(
        "./test/unit",
        /.*\.js$/
        ).each(file => require("../" + file));
});
