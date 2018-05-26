import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FeedbackViewPane from "../../../src/components/FeedbackViewPane";
import { housingService } from '../../../fixtures/services';
import feedback from '../../../fixtures/feedback';

describe('FeedbackViewPane', () => {
  it('renders correctly', () => {
    housingService.feedback = feedback;
    const wrapper = shallow(<FeedbackViewPane service={housingService} width={200} />);
    expect(wrapper).to.matchSnapshot();
  });
});