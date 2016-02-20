(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactAccessibleModal"] = factory(require("React"));
	else
		root["ReactAccessibleModal"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _componentsModal = __webpack_require__(1);
	
	var _componentsModal2 = _interopRequireDefault(_componentsModal);

	exports['default'] = _componentsModal2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _focusTrap = __webpack_require__(3);
	
	var _focusTrap2 = _interopRequireDefault(_focusTrap);
	
	var _tabbable = __webpack_require__(4);
	
	var _tabbable2 = _interopRequireDefault(_tabbable);
	
	var _utils = __webpack_require__(5);
	
	var bodyActiveClass = 'u-body-modal-active';
	var animationEvent = (0, _utils.whichAnimationEvent)();
	
	function stopPropagation(event) {
	    event.stopPropagation();
	}
	
	exports['default'] = _react2['default'].createClass({
	
	    displayName: 'Modal',
	
	    propTypes: {
	        isOpen: _react2['default'].PropTypes.bool.isRequired,
	        onRequestClose: _react2['default'].PropTypes.func,
	        onAfterClose: _react2['default'].PropTypes.func,
	        overlayClick: _react2['default'].PropTypes.bool,
	        label: _react2['default'].PropTypes.string,
	        className: _react2['default'].PropTypes.string,
	        controls: _react2['default'].PropTypes.object,
	        children: _react2['default'].PropTypes.object,
	        ariaHideApp: _react2['default'].PropTypes.bool
	    },
	
	    getDefaultProps: function getDefaultProps() {
	        return {
	            isOpen: false,
	            ariaHideApp: true,
	            onRequestClose: null,
	            onAfterClose: function onAfterClose() {},
	            overlayClick: true,
	            className: '',
	            label: '',
	            controls: null
	        };
	    },
	
	    getInitialState: function getInitialState() {
	        return {
	            afterOpen: false,
	            beforeClose: false
	        };
	    },
	
	    componentDidMount: function componentDidMount() {
	        // Focus needs to be set when mounting and already open
	        if (this.props.isOpen) {
	            this.open();
	        }
	    },
	
	    componentWillUnmount: function componentWillUnmount() {},
	
	    componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	        // Focus only needs to be set once when the modal is being opened
	        if (!this.props.isOpen && newProps.isOpen) {
	            this.open();
	        } else if (this.props.isOpen && !newProps.isOpen) {
	            this.handleClose();
	        }
	    },
	
	    open: function open() {
	        document.body.classList.add(bodyActiveClass);
	        this.setAriaHidden(false);
	        this.setFocusTrap();
	
	        this.setState({ afterOpen: true }, function () {
	            window.addEventListener('keydown', this.handleKeyDown);
	        });
	    },
	
	    requestClose: function requestClose() {
	        var onRequestClose = this.props.onRequestClose;
	
	        if (onRequestClose) {
	            onRequestClose();
	        }
	    },
	
	    handleClose: function handleClose() {
	        var onRequestClose = this.props.onRequestClose;
	
	        document.body.classList.remove(bodyActiveClass);
	
	        if (!onRequestClose) {
	            return;
	        }
	
	        if (animationEvent) {
	            var modal = this.refs.modal;
	            modal.addEventListener(animationEvent, this.close);
	            modal.classList.remove('modal--active');
	            modal.classList.add('modal--exit');
	            this.setState({
	                beforeClose: true
	            });
	            return;
	        }
	
	        this.close();
	    },
	
	    close: function close(e) {
	        var modal = this.refs.modal;
	
	        // make sure we're listening to the modals animationEvent
	        var target = e.target || e.srcElement;
	        if (e && target !== modal) {
	            return;
	        }
	
	        this.setAriaHidden(true);
	
	        if (animationEvent) {
	            modal.removeEventListener(animationEvent, this.close);
	        }
	
	        this.setState({
	            afterOpen: false,
	            beforeClose: false
	        }, this.afterClose);
	    },
	
	    afterClose: function afterClose() {
	        _focusTrap2['default'].deactivate(this.refs.modal);
	        window.removeEventListener('keydown', this.handleKeyDown);
	
	        this.props.onAfterClose();
	    },
	
	    handleKeyDown: function handleKeyDown(e) {
	        // ESC key
	        if (e.keyCode === 27) {
	            this.requestClose();
	        }
	    },
	
	    handleOverlayClick: function handleOverlayClick() {
	        var overlayClick = this.props.overlayClick;
	
	        if (!overlayClick) {
	            return;
	        }
	
	        this.requestClose();
	    },
	
	    shouldBeClosed: function shouldBeClosed() {
	        return !this.props.isOpen && !this.state.beforeClose;
	    },
	
	    setAriaHidden: function setAriaHidden(isHidden) {
	        var ariaHideApp = this.props.ariaHideApp;
	        var content = this.refs.content;
	
	        if (!ariaHideApp) {
	            return;
	        }
	
	        if (!content) {
	            return;
	        }
	
	        content.setAttribute('aria-hidden', isHidden);
	
	        var mainContent = document.querySelector('[data-main-content]');
	        if (mainContent) {
	            mainContent.setAttribute('aria-hidden', !isHidden);
	        }
	    },
	
	    setFocusTrap: function setFocusTrap() {
	        var _refs = this.refs;
	        var modal = _refs.modal;
	        var content = _refs.content;
	
	        if (!content) {
	            return;
	        }
	
	        var tabbableItems = (0, _tabbable2['default'])(content);
	        if (tabbableItems.length > 0) {
	            _focusTrap2['default'].activate(modal);
	        }
	    },
	
	    render: function render() {
	        var _props = this.props;
	        var className = _props.className;
	        var children = _props.children;
	        var controls = _props.controls;
	        var label = _props.label;
	
	        var classList = ['modal', 'modal--active'];
	
	        if (className) {
	            classList.push(className);
	        }
	
	        return this.shouldBeClosed() ? null : _react2['default'].createElement(
	            'div',
	            {
	                className: classList.join(' '),
	                ref: 'modal'
	            },
	            _react2['default'].createElement(
	                'div',
	                { className: 'modal__table' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'modal__center' },
	                    _react2['default'].createElement(
	                        'div',
	                        {
	                            ref: 'content',
	                            className: 'modal__content',
	                            onClick: stopPropagation,
	                            'aria-label': label,
	                            'aria-hidden': 'true',
	                            role: 'dialog'
	                        },
	                        children
	                    )
	                )
	            ),
	            controls ? controls : _react2['default'].createElement(
	                'div',
	                { className: 'modal__control' },
	                _react2['default'].createElement(
	                    'div',
	                    { className: 'modal__control-item modal__close', onClick: this.requestClose },
	                    '×'
	                )
	            ),
	            _react2['default'].createElement('div', {
	                className: 'modal__overlay',
	                tabIndex: '-1',
	                onClick: this.handleOverlayClick
	            })
	        );
	    }
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var tabbable = __webpack_require__(4);
	
	var trap;
	var tabbableNodes;
	var previouslyFocused;
	var activeFocusTrap;
	var config;
	
	function activate(element, options) {
	  // There can be only one focus trap at a time
	  if (activeFocusTrap) deactivate();
	  activeFocusTrap = true;
	
	  trap = (typeof element === 'string')
	    ? document.querySelector(element)
	    : element;
	  config = options || {};
	  previouslyFocused = document.activeElement;
	
	  updateTabbableNodes();
	
	  tryFocus(firstFocusNode());
	
	  document.addEventListener('focus', checkFocus, true);
	  document.addEventListener('click', checkClick, true);
	  document.addEventListener('keydown', checkKey, true);
	}
	
	function firstFocusNode() {
	  var node;
	
	  if (!config.initialFocus) {
	    node = tabbableNodes[0];
	    if (!node) {
	      throw new Error('You can\'t have a focus-trap without at least one focusable element');
	    }
	    return node;
	  }
	
	  if (typeof config.initialFocus === 'string') {
	    node = document.querySelector(config.initialFocus);
	  } else {
	    node = config.initialFocus;
	  }
	  if (!node) {
	    throw new Error('The `initialFocus` selector you passed refers to no known node');
	  }
	  return node;
	}
	
	function deactivate() {
	  if (!activeFocusTrap) return;
	  activeFocusTrap = false;
	
	  document.removeEventListener('focus', checkFocus, true);
	  document.removeEventListener('click', checkClick, true);
	  document.removeEventListener('keydown', checkKey, true);
	
	  if (config.onDeactivate) config.onDeactivate();
	
	  setTimeout(function() {
	    tryFocus(previouslyFocused);
	  }, 0);
	}
	
	function checkClick(e) {
	  if (trap.contains(e.target)) return;
	  e.preventDefault();
	  e.stopImmediatePropagation();
	}
	
	function checkFocus(e) {
	  updateTabbableNodes();
	  if (trap.contains(e.target)) return;
	  tryFocus(tabbableNodes[0]);
	}
	
	function checkKey(e) {
	  if (e.key === 'Tab' || e.keyCode === 9) {
	    handleTab(e);
	  }
	
	  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
	    deactivate();
	  }
	}
	
	function handleTab(e) {
	  e.preventDefault();
	  updateTabbableNodes();
	  var currentFocusIndex = tabbableNodes.indexOf(e.target);
	  var lastTabbableNode = tabbableNodes[tabbableNodes.length - 1];
	  var firstTabbableNode = tabbableNodes[0];
	  if (e.shiftKey) {
	    if (e.target === firstTabbableNode) {
	      tryFocus(lastTabbableNode);
	      return;
	    }
	    tryFocus(tabbableNodes[currentFocusIndex - 1]);
	    return;
	  }
	  if (e.target === lastTabbableNode) {
	    tryFocus(firstTabbableNode);
	    return;
	  }
	  tryFocus(tabbableNodes[currentFocusIndex + 1]);
	}
	
	function updateTabbableNodes() {
	  tabbableNodes = tabbable(trap);
	}
	
	function tryFocus(node) {
	  if (!node || !node.focus) return;
	  node.focus();
	  if (node.tagName.toLowerCase() === 'input') {
	    node.select();
	  }
	}
	
	module.exports = {
	  activate: activate,
	  deactivate: deactivate,
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(el) {
	  var basicTabbables = [];
	  var orderedTabbables = [];
	
	  var candidateNodelist = el.querySelectorAll('input, select, a, textarea, button, [tabindex]');
	  var candidates = Array.prototype.slice.call(candidateNodelist);
	
	  var candidate, candidateIndex;
	  for (var i = 0, l = candidates.length; i < l; i++) {
	    candidate = candidates[i];
	    candidateIndex = candidate.tabIndex;
	
	    if (
	      candidateIndex < 0
	      || (candidate.tagName === 'INPUT' && candidate.type === 'hidden')
	      || (candidate.tagName === 'A' && !candidate.href && !candidate.tabIndex)
	      || candidate.disabled
	      || isHidden(candidate)
	    ) {
	      continue;
	    }
	
	    if (candidateIndex === 0) {
	      basicTabbables.push(candidate);
	    } else {
	      orderedTabbables.push({
	        tabIndex: candidateIndex,
	        node: candidate,
	      });
	    }
	  }
	
	  var tabbableNodes = orderedTabbables
	    .sort(function(a, b) {
	      return a.tabIndex - b.tabIndex;
	    })
	    .map(function(a) {
	      return a.node
	    });
	
	  Array.prototype.push.apply(tabbableNodes, basicTabbables);
	
	  return tabbableNodes;
	}
	
	var nodeCache = {};
	var nodeCacheIndex = 1;
	function isHidden(node) {
	  if (node === document.documentElement) {
	    return false;
	  }
	
	  if (node.tabbableCacheIndex) {
	    return nodeCache[node.tabbableCacheIndex];
	  }
	
	  var result = false;
	  var style = window.getComputedStyle(node);
	  if (style.visibility === 'hidden' || style.display === 'none') {
	    result = true;
	  } else if (node.parentNode) {
	    result = isHidden(node.parentNode);
	  }
	
	  node.tabbableCacheIndex = nodeCacheIndex;
	  nodeCache[node.tabbableCacheIndex] = result;
	  nodeCacheIndex++;
	
	  return result;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.whichAnimationEvent = whichAnimationEvent;
	exports.getEventTarget = getEventTarget;
	
	function whichAnimationEvent() {
	    var tr = undefined;
	    var el = document.createElement('fakeelement');
	    var transitions = {
	        animation: 'animationend',
	        OAnimation: 'oAnimationEnd',
	        MozAnimation: 'animationend',
	        WebkitAnimation: 'webkitAnimationEnd'
	    };
	
	    for (tr in transitions) {
	        if (el.style[tr] !== undefined) {
	            return transitions[tr];
	        }
	    }
	}
	
	// Returns event target, supporting IE6-8
	
	function getEventTarget(event) {
	    if (event) {
	        return event.target || event.srcElement;
	    }
	    return false;
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-accessible-modal.js.map