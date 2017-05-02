import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Modal from '../../index';

/* eslint func-names:0 */
describe('Modal', () => {
    let item;
    let modal;

    beforeEach(() => {
        item = TestUtils.renderIntoDocument(
            <Modal isOpen className={'modal--slideshow'} overlayClick>
                <div className="modal__slideshow-inner">
                    <div className="modal__slideshow-wrapper">
                        <h1>Oh, hello!</h1>
                    </div>
                </div>
            </Modal>,
        );
        modal = ReactDOM.findDOMNode(item);
    });

    it('should have class name', () => {
        expect(modal.className).to.equal('modal modal--active modal--slideshow');
    });
});
