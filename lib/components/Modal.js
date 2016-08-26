import React from 'react';

import focusTrap from 'focus-trap';

import { whichAnimationEvent } from './utils';


const bodyActiveClass = 'u-body-modal-active';
const animationEvent = whichAnimationEvent();

function stopPropagation(event) {
    event.stopPropagation();
}

export default React.createClass({

    displayName: 'Modal',

    propTypes: {
        children: React.PropTypes.node.isRequired,
        isOpen: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func,
        onAfterOpen: React.PropTypes.func,
        onAfterClose: React.PropTypes.func,
        overlayClick: React.PropTypes.bool,
        label: React.PropTypes.string,
        className: React.PropTypes.string,
        controls: React.PropTypes.object,
        insideControls: React.PropTypes.bool,
        ariaHideApp: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
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
    },

    getInitialState() {
        return {
            // afterOpen: false,
            beforeClose: false,
        };
    },

    componentDidMount() {
        // Focus needs to be set when mounting and already open
        if (this.props.isOpen) {
            this.open();
        }
    },

    componentWillReceiveProps(newProps) {
        if (this.props.isOpen && !newProps.isOpen) {
            this.handleClose();
        }
    },

    componentDidUpdate(prevProps) {
        // Focus only needs to be set once when the modal is being opened
        if (!prevProps.isOpen && this.props.isOpen) {
            this.open();
        }
    },

    componentWillUnmount() {
        if (this.props.isOpen) {
            this.cleanup();
        }
    },

    open() {
        document.body.classList.add(bodyActiveClass);

        if (animationEvent) {
            const modal = this.refs.modal;
            modal.addEventListener(animationEvent, this.afterOpen );
            return;
        }

        this.afterOpen();
    },

    afterOpen(e) {
        const { modal } = this.refs;

        // make sure we're listening to the modals animationEvent
        if (e) {
            const target = e.target || e.srcElement;
            if (target !== modal) {
                return;
            }
        }

        this.setAriaHidden(false);
        this.setFocusTrap();

        if (animationEvent) {
            modal.removeEventListener(animationEvent, this.afterOpen);
        }

        this.setState({afterOpen: true}, function() {
            window.addEventListener('keydown', this.handleKeyDown);
            if (this.props.onAfterOpen) {
                this.props.onAfterOpen();
            }
        });
    },


    requestClose() {
        const { onRequestClose } = this.props;

        if (onRequestClose) {
            onRequestClose();
        }
    },

    handleClose() {
        const { onRequestClose } = this.props;

        document.body.classList.remove(bodyActiveClass);

        if (!onRequestClose) {
            return;
        }

        if (animationEvent) {
            const modal = this.refs.modal;
            modal.addEventListener(animationEvent, this.close );
            modal.classList.remove('modal--active');
            modal.classList.add('modal--exit');
            this.setState({
                beforeClose: true
            });
            return;
        }

        this.close();
    },

    close(e) {
        const { modal } = this.refs;

        // make sure we're listening to the modals animationEvent
        if (e) {
            const target = e.target || e.srcElement;
            if (target !== modal) {
                return;
            }
        }

        this.setAriaHidden(true);

        if (animationEvent) {
            modal.removeEventListener(animationEvent, this.close);
        }

        this.setState({
            afterOpen: false,
            beforeClose: false,
        }, this.afterClose);
    },

    cleanup() {
        document.body.classList.remove(bodyActiveClass);
        focusTrap.deactivate(this.refs.modal);
        window.removeEventListener('keydown', this.handleKeyDown);
    },

    afterClose() {
        const { onAfterClose } = this.props;
        this.cleanup();

        if (onAfterClose) {
            onAfterClose();
        }
    },

    handleKeyDown(e) {
        // ESC key
        if (e.keyCode === 27) {
            this.requestClose();
        }
    },

    handleOverlayClick() {
        const { overlayClick } = this.props;
        if (!overlayClick) {
            return;
        }

        this.requestClose();
    },

    shouldBeClosed() {
        return !this.props.isOpen && !this.state.beforeClose;
    },

    setAriaHidden(isHidden) {
        const { ariaHideApp } = this.props;
        const { content } = this.refs;

        if (!ariaHideApp) {
            return;
        }

        if (!content) {
            return;
        }

        content.setAttribute('aria-hidden', isHidden);

        const mainContent = document.querySelector('[data-main-content]');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', !isHidden);
        }
    },

    setFocusTrap() {
        const { modal, content } = this.refs;

        if (!content) {
            return;
        }

        focusTrap.activate(modal, {
            clickOutsideDeactivates: true,
            returnFocusOnDeactivate: true,
        });
    },

    render() {
        const { className, children, controls, label, insideControls } = this.props;

        const classList = ['modal', 'modal--active'];

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

        if (className) {
            classList.push(className);
        }

        return this.shouldBeClosed() ? null : (
            <div
                className={classList.join(' ')}
                ref="modal"
            >
                <div className="modal__table">
                    <div className="modal__center">
                        <div
                            ref="content"
                            className="modal__content"
                            onClick={stopPropagation}
                            aria-label={label}
                            aria-hidden="true"
                            role="dialog"
                        >
                            {insideControls && controlsMarkup}

                            {children}

                        </div>
                    </div>
                </div>

                {!insideControls && controlsMarkup}

                <div
                    className="modal__overlay"
                    tabIndex="-1"
                    onClick={this.handleOverlayClick}
                ></div>
            </div>
        );
    },
});

