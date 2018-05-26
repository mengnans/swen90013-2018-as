import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import RatingListItem from "../../../src/components/RatingListItem";
import feedback from '../../../fixtures/feedback';

describe('RatingListItem', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<RatingListItem data={feedback.ratings[0]} width={200} onClickRatingListItem={() => undefined} disabled={false}  />);
    expect(wrapper).to.matchSnapshot();
  });
});