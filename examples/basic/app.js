import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../lib/index';


const App = React.createClass({

    getInitialState() {
        return {
            modalIsOpen: false
        };
    },

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    },

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    },

    render() {
        return (
            <div className="example">
                <h1>React Modal example</h1>
                <p onClick={this.openModal}>Open modal</p>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className={"modal--slideshow"}
                    overlayClick={false}
                >
                    <div className="modal__slideshow-inner">
                        <div className="modal__slideshow-wrapper">
                            <h1>Oh, hello!</h1>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('container'));
