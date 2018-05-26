import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FeedbackProvidePane from "../../../src/components/FeedbackProvidePane";
import { housingService } from '../../../fixtures/services';
import feedback from '../../../fixtures/feedback';

describe('FeedbackProvidePane', () => {
  it('renders correctly', () => {
    housingService.feedback = feedback;
    const wrapper = shallow(<FeedbackProvidePane service={housingService} width={200} />);
    expect(wrapper).to.matchSnapshot();
  });
});