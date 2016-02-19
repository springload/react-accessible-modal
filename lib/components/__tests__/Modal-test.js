import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Modal from '../../index';


/* eslint func-names:0 */
describe('Icon', function() {
  let item;
  let modal;

  beforeEach(() => {
    item = TestUtils.renderIntoDocument(
        <Modal
            isOpen={false}
            label="a video modal"
            onRequestClose={null}
            onAfterClose={null}
            className={"modal--video"}
        >
          <div className="modal__video-inner">
            <div className="modal__video-wrapper"></div>
          </div>
        </Modal>
    );
    modal = ReactDOM.findDOMNode(item);
  });

  it('should have class name', function() {
    expect(modal.className.baseVal).to.equal('i i--red');
  });
});