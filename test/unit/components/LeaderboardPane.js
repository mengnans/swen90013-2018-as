import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LeaderboardPane from "../../../src/components/LeaderboardPane";

describe('LeaderboardPane', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<LeaderboardPane />);

        expect(wrapper).to.matchSnapshot();
    });
});