import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { housingService } from '../../../fixtures/services';
import Clap from "../../../src/components/Clap";

describe('Clap', () => {
    it('renders correctly', () => {

        const wrapper = shallow(
            <Clap
                count={100}
                isClicked={true}
                service={housingService}
            />
        );

        expect(wrapper).to.matchSnapshot();
    });
});