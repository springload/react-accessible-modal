import React from 'react';
import { shallow } from 'enzyme';
import Modal from './index';

describe('Modal', () => {
    it('renders', () => {
        expect(shallow((
            <Modal isOpen={false}>
                Test
            </Modal>
        ))).toMatchSnapshot();
    });

    it('#isOpen', () => {
        expect(shallow((
            <Modal isOpen={true}>
                Test
            </Modal>
        ))).toMatchSnapshot();
    });
});
