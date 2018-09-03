import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import StarTextItem from "../../../src/components/StarTextItem";

describe('StarTextItem', () => {
    it('renders correctly', () => {
        const wrapper = shallow(
          <StarTextItem
              rating={3}
              onRatingChange={() => null}
              width={1000}
          />
        );

        expect(wrapper).to.matchSnapshot();
    });
});