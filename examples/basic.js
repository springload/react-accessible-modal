import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../lib/index';

const App = React.createClass({

    getInitialState() {
        return {
            modalIsOpen: false,
            modalAltIsOpen: false
        };
    },

    openModal(item) {
        this.setState({
            [item]: true,
        });
    },

    closeModal(item) {
        this.setState({
            [item]: false,
        });
    },

    render() {
        return (
            <div>
                <p>
                    <a href="#" onClick={() => this.openModal('modalIsOpen')}>Open modal</a>
                </p>
                <p>
                    <a href="#" onClick={() => this.openModal('modalAltIsOpen')}>Open alternative modal</a>
                </p>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => this.closeModal('modalIsOpen')}
                    className={"modal--slideshow"}
                    overlayClick
                >
                    <h2>Oh, hello!</h2>
                    <a href="#">Link inside content</a>
                </Modal>
                <Modal
                    isOpen={this.state.modalAltIsOpen}
                    onRequestClose={() => this.closeModal('modalAltIsOpen')}
                    className={"modal--slideshow"}
                    insideControls
                    overlayClick
                >
                    <h2>Oh, hello!</h2>
                    <a href="#">Link inside content</a>
                </Modal>
            </div>
        );
    },
});

ReactDOM.render(<App />, document.querySelector('[data-mount-basic]'));
