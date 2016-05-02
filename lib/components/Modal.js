import React from 'react';

import focusTrap from 'focus-trap';
import tabbable from 'tabbable';

import { whichAnimationEvent } from './utils';


const bodyActiveClass = 'u-body-modal-active';
const animationEvent = whichAnimationEvent();

function stopPropagation(event) {
    event.stopPropagation();
}

export default React.createClass({

    displayName: 'Modal',

    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func,
        onAfterClose: React.PropTypes.func,
        overlayClick: React.PropTypes.bool,
        label: React.PropTypes.string,
        className: React.PropTypes.string,
        controls: React.PropTypes.object,
        children: React.PropTypes.node,
        ariaHideApp: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            isOpen: false,
            ariaHideApp: true,
            onRequestClose: null,
            onAfterClose: () => {},
            overlayClick: true,
            className: '',
            label: '',
            controls: null,
        };
    },

    getInitialState() {
        return {
            afterOpen: false,
            beforeClose: false,
        };
    },

    componentDidMount() {
        // Focus needs to be set when mounting and already open
        if (this.props.isOpen) {
            this.open();
        }
    },

    componentWillUnmount() {
    },

    componentWillReceiveProps(newProps) {
        // Focus only needs to be set once when the modal is being opened
        if (!this.props.isOpen && newProps.isOpen) {
            this.open();
        } else if (this.props.isOpen && !newProps.isOpen) {
            this.handleClose();
        }
    },

    open() {
        document.body.classList.add(bodyActiveClass);
        this.setAriaHidden(false);
        this.setFocusTrap();

        this.setState({afterOpen: true}, function() {
            window.addEventListener('keydown', this.handleKeyDown);
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

    afterClose() {
        focusTrap.deactivate(this.refs.modal);
        window.removeEventListener('keydown', this.handleKeyDown);

        this.props.onAfterClose();
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

        const tabbableItems = tabbable(content);
        if (tabbableItems.length > 0) {
            focusTrap.activate(modal, {
                initialFocus: 'a'
            });
        }
    },

    render() {
        const { className, children, controls, label } = this.props;

        const classList = ['modal', 'modal--active'];

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
                            {children}
                        </div>
                    </div>
                </div>
                {controls ? controls : (
                    <div className="modal__control">
                        <div className="modal__control-item modal__close" onClick={this.requestClose}>×</div>
                    </div>
                )}
                <div
                    className="modal__overlay"
                    tabIndex="-1"
                    onClick={this.handleOverlayClick}
                ></div>
            </div>
        );
    },
});

