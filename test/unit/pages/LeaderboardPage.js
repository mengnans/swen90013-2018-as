import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LeaderboardPage from "../../../src/pages/LeaderboardPage";

describe('LeaderboardPage', () => {
    it('renders correctly', () => {
        const testParams = {
            slug: 'leaderboard',
        };

        const wrapper = shallow(<LeaderboardPage params={testParams} />);

        expect(wrapper).to.matchSnapshot();
    });
});