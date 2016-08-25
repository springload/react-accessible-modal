import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../lib/index';


const App = React.createClass({

  getInitialState() {
    return {
      modalIsOpen: false,
      modalAltIsOpen: false
    };
  },

  render() {
    return (
      <div className="example">
        <h1>React Modal example</h1>
        <p>
          <a onClick={() => this.openModal('modalIsOpen')}>Open modal</a>
        </p>
        <p>
          <a onClick={() => this.openModal('modalAltIsOpen')}>Open alternative modal</a>
        </p>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal('modalIsOpen')}
          className={"modal--slideshow"}
          overlayClick
        >
          <div className="modal__slideshow-inner">
            <div className="modal__slideshow-wrapper">
              <h1>Oh, hello!</h1>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={this.state.modalAltIsOpen}
          onRequestClose={() => this.closeModal('modalAltIsOpen')}
          className={"modal--slideshow"}
          insideControls
          overlayClick
        >
          <div className="modal__slideshow-inner">
            <div className="modal__slideshow-wrapper">
              <h1>Oh, hello!</h1>
            </div>
          </div>
        </Modal>
      </div>
    );
  },

  openModal(item) {
    this.setState({
      [item]: true
    });
  },


  closeModal(item) {
    this.setState({
      [item]: false
    });
  }

});

ReactDOM.render(<App/>, document.getElementById('container'));
