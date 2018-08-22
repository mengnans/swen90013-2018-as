import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import LeaderboardListItem from "../../../src/components/LeaderboardListItem";

describe('LeaderboardListItem', () => {
    it('renders correctly', () => {
        const testData = {
            serviceName: 'test service',
            claps: 100,
            slug: '111-test-service',
        };

        const wrapper = shallow(<LeaderboardListItem data={testData} />);

        expect(wrapper).to.matchSnapshot();
    });
});