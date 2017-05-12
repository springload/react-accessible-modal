import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../lib/index';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
            modalAltIsOpen: false,
        };
    }

    openModal(item) {
        this.setState({
            [item]: true,
        });
    }


    closeModal(item) {
        this.setState({
            [item]: false,
        });
    }

    render() {
        const { modalIsOpen, modalAltIsOpen } = this.state;

        return (
            <div>
                <p>
                    <button onClick={() => this.openModal('modalIsOpen')}>
                        Open modal
                    </button>
                </p>
                <p>
                    <button onClick={() => this.openModal('modalAltIsOpen')}>
                        Open alternative modal
                    </button>
                </p>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => this.closeModal('modalIsOpen')}
                    className="modal--slideshow"
                    overlayClick
                >
                    <h2>Oh, hello!</h2>
                    <a href="http://example.com/">Link inside content</a>
                </Modal>
                <Modal
                    isOpen={modalAltIsOpen}
                    onRequestClose={() => this.closeModal('modalAltIsOpen')}
                    className="modal--slideshow"
                    insideControls
                    overlayClick
                >
                    <h2>Oh, hello!</h2>
                    <a href="http://example.com/">Link inside content</a>
                </Modal>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('[data-mount-basic]'));
