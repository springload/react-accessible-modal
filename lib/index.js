import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import focusTrap from 'focus-trap';

import { whichAnimationEvent } from './utils';

const bodyActiveClass = 'u-body-modal-active';
const animationEvent = whichAnimationEvent();

function stopPropagation(event) {
    event.stopPropagation();
}

const propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    onAfterOpen: PropTypes.func,
    onAfterClose: PropTypes.func,
    overlayClick: PropTypes.bool,
    label: PropTypes.string,
    className: PropTypes.string,
    controls: PropTypes.object,
    insideControls: PropTypes.bool,
    ariaHideApp: PropTypes.bool,
};

const defaultProps = {
    ariaHideApp: true,
    onRequestClose: null,
    onAfterOpen: null,
    onAfterClose: null,
    overlayClick: true,
    className: '',
    label: null,
    controls: null,
    insideControls: false,
};

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // afterOpen: false,
            beforeClose: false,
        };

        this.afterClose = this.afterClose.bind(this);
        this.afterOpen = this.afterOpen.bind(this);
        this.cleanup = this.cleanup.bind(this);
        this.close = this.close.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEnterKeyDown = this.handleEnterKeyDown.bind(this);
        this.handleEscapeKeyDown = this.handleEscapeKeyDown.bind(this);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.open = this.open.bind(this);
        this.requestClose = this.requestClose.bind(this);
        this.setAriaHidden = this.setAriaHidden.bind(this);
        this.setFocusTrap = this.setFocusTrap.bind(this);
        this.shouldBeClosed = this.shouldBeClosed.bind(this);
    }

    componentDidMount() {
        const { isOpen } = this.props;

        // Focus needs to be set when mounting and already open
        if (isOpen) {
            this.open();
        }
    }

    componentWillReceiveProps(newProps) {
        const { isOpen } = this.props;

        if (isOpen && !newProps.isOpen) {
            this.handleClose();
        }
    }

    componentDidUpdate(prevProps) {
        const { isOpen } = this.props;

        // Focus only needs to be set once when the modal is being opened
        if (!prevProps.isOpen && isOpen) {
            this.open();
        }
    }

    componentWillUnmount() {
        const { isOpen } = this.props;

        if (isOpen) {
            this.cleanup();
        }
    }

    open() {
        document.body.classList.add(bodyActiveClass);

        if (animationEvent) {
            this.modalRef.addEventListener(animationEvent, this.afterOpen);
            return;
        }

        this.afterOpen();
    }

    afterOpen(e) {
        console.log(this, this.modalRef);
        this.closeButton = this.modalRef.querySelector('.modal__close');

        // make sure we're listening to the modals animationEvent
        if (e) {
            const target = e.target || e.srcElement;
            if (target !== this.modalRef) {
                return;
            }
        }

        this.setAriaHidden(false);
        this.setFocusTrap();

        if (animationEvent) {
            this.modalRef.removeEventListener(animationEvent, this.afterOpen);
        }

        this.setState({ afterOpen: true }, () => {
            window.addEventListener('keydown', this.handleEscapeKeyDown);
            this.closeButton.addEventListener('keydown', this.handleEnterKeyDown);
            if (this.props.onAfterOpen) {
                this.props.onAfterOpen();
            }
        });
    }

    requestClose() {
        const { onRequestClose } = this.props;

        if (onRequestClose) {
            onRequestClose();
        }
    }

    handleClose() {
        const { onRequestClose } = this.props;

        document.body.classList.remove(bodyActiveClass);

        if (!onRequestClose) {
            return;
        }

        if (animationEvent) {
            const modal = this.modalRef;
            modal.addEventListener(animationEvent, this.close);
            modal.classList.remove('modal--active');
            modal.classList.add('modal--exit');
            this.setState({
                beforeClose: true,
            });
            return;
        }

        this.close();
    }

    close(e) {
        // make sure we're listening to the modals animationEvent
        if (e) {
            const target = e.target || e.srcElement;
            if (target !== this.modalRef) {
                return;
            }
        }

        this.setAriaHidden(true);

        if (animationEvent) {
            this.modalRef.removeEventListener(animationEvent, this.close);
        }

        this.setState({
            afterOpen: false,
            beforeClose: false,
        }, this.afterClose);
    }

    cleanup() {
        document.body.classList.remove(bodyActiveClass);
        focusTrap.deactivate(this.modalRef);
        window.removeEventListener('keydown', this.handleEscapeKeyDown);
        this.closeButton.removeEventListener('keydown', this.handleEnterKeyDown);
    }

    afterClose() {
        const { onAfterClose } = this.props;
        this.cleanup();

        if (onAfterClose) {
            onAfterClose();
        }
    }

    handleEscapeKeyDown(e) {
        // ESC key
        if (e.keyCode === 27) {
            this.requestClose();
        }
    }

    handleEnterKeyDown(e) {
        // Enter key
        if (e.keyCode === 13) {
            this.requestClose();
        }
    }

    handleOverlayClick() {
        const { overlayClick } = this.props;
        if (!overlayClick) {
            return;
        }

        this.requestClose();
    }

    shouldBeClosed() {
        return !this.props.isOpen && !this.state.beforeClose;
    }

    setAriaHidden(isHidden) {
        const { ariaHideApp } = this.props;

        if (!ariaHideApp) {
            return;
        }

        if (!this.contentRef) {
            return;
        }

        this.contentRef.setAttribute('aria-hidden', isHidden);

        const mainContent = document.querySelector('[data-main-content]');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', !isHidden);
        }
    }

    setFocusTrap() {
        if (!this.contentRef) {
            return;
        }

        focusTrap.activate(this.modalRef, {
            initialFocus: this.contentRef,
            clickOutsideDeactivates: true,
            returnFocusOnDeactivate: true,
        });
    }

    render() {
        const { className, children, controls, label, insideControls } = this.props;
        let controlsMarkup;

        if (controls) {
            controlsMarkup = controls;
        } else {
            controlsMarkup = (
                <div className={`modal__control${insideControls ? ' modal__control--inside' : ''}`}>
                    <div className="modal__control-item modal__close" role="button" tabIndex="0" onClick={this.requestClose} tabIndex="0">×</div>
                </div>
            );
        }

        return this.shouldBeClosed() ? null : (
            <div
                className={`modal modal--active ${className}`}
                ref={(elt) => { this.modalRef = elt; }}
            >
                <div className="modal__table">
                    <div className="modal__center">
                        <div
                            ref={(elt) => { this.contentRef = elt; }}
                            className="modal__content"
                            onClick={stopPropagation}
                            aria-label={label}
                            aria-hidden="true"
                            role="dialog"
                        >
                            {children}

                            {insideControls && controlsMarkup}
                        </div>
                    </div>
                </div>

                {!insideControls && controlsMarkup}

                <div className="modal__overlay" tabIndex="-1" onClick={this.handleOverlayClick} />
            </div>
        );
    }
}

Modal.propTypes = propTypes;

Modal.defaultProps = defaultProps;

export default Modal;
