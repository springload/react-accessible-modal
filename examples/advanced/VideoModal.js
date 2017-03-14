/* eslint-disable new-cap */
import React from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-accessible-modal';
import YouTubePlayer from 'youtube-player';

import {
    getWidth,
    getHeight,
} from '../../utils';


const VideoModal = React.createClass({

    propTypes: {
        isOpen: React.PropTypes.bool,
        videoId: React.PropTypes.string,
        playlistId: React.PropTypes.string,
        modalContainer: React.PropTypes.object,
    },

    getDefaultProps() {
        return {
            isOpen: false,
            videoId: '',
            playlistId: '',
            modalContainer: null,
        };
    },

    getInitialState: () => {
        return {
            modalIsOpen: this.props.isOpen,
        };
    },

    openModal: () => {
        this.setState({
            modalIsOpen: true,
        });
    },

    closeModal: () => {
        this.setState({
            modalIsOpen: false,
        });
    },

    componentDidMount() {
        const { videoId } = this.props;
        const { inner, wrapper } = this.refs;

        YouTubePlayer(wrapper, {
            width: getWidth(inner),
            height: getHeight(inner),
            videoId: videoId,
            playerVars: {
                autoplay: 1,
                origin: window.location.origin,
            },
            events: {
                onReady: this.onPlayerReady,
                onStateChange: this.onPlayerStateChange,
            },
        });
    },

    onPlayerReady() {
    },

    onPlayerStateChange() {
    },

    destroyModal() {
        const { modalContainer } = this.props;
        if (modalContainer) {
            ReactDOM.unmountComponentAtNode(modalContainer);
        }
    },

    render() {
        return (
            <Modal
                ref="videoModal"
                isOpen={this.state.modalIsOpen}
                label="a video modal"
                onRequestClose={this.closeModal}
                onAfterClose={this.destroyModal}
                className={"modal--video"}
            >
                <div className="modal__video-inner" ref="inner">
                    <div className="modal__video-wrapper" ref="wrapper"></div>
                </div>
            </Modal>
        );
    },
});

export default VideoModal;

export const initVideos = () => {
    const modalContainer = document.querySelector('[data-modal]');
    const videos = querySelectArray('[data-video-id]');

    const videoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let videoId = e.currentTarget.getAttribute('data-video-id');

        // Account for different video formats
        if (videoId.match(/watch\?v=/)) {
            videoId = videoId.split('v=', 2)[1];
        } else if (videoId.match(/\.be\/.+/)) {
            videoId = videoId.split('.be/')[1];
        }

        ReactDOM.render(
            <VideoModal
                isOpen={true}
                videoId={videoId}
                modalContainer={modalContainer}
            />, modalContainer
        );
    };

    const videoKeyDown = (e) => {
        // Enter key
        if (e.keyCode === 13) {
            videoClick(e);
        }
    };

    videos.forEach((item) => {
        item.addEventListener('click', videoClick, false);
        item.addEventListener('keydown', videoKeyDown, false);
    });
};
