import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FeedbackPane from "../../../src/components/FeedbackPane";
import { housingService } from '../../../fixtures/services';

describe('FeedbackPane', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<FeedbackPane service={housingService} />);
    expect(wrapper).to.matchSnapshot();
  });
});