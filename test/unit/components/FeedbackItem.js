import React from 'react';
import { render, shallow } from 'enzyme';
import { expect } from 'chai';
import FeedbackItem from "../../../src/components/FeedbackItem";

describe('FeedbackItem', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <FeedbackItem
        rating={2.555555}
        numberOfRatings={200} 
        starDimension={5}
        starSpacing={10}
        compact={false}
      />
    );

    expect(wrapper).to.matchSnapshot();
  });
});