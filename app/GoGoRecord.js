import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import VideoRecorder from './components/VideoRecorder.js';
import VideoEditor from './components/VideoEditor.js';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideoRecorder: true,
            videoFile: ''
        }

        this.handleDoneRecording = this.handleDoneRecording.bind(this);
        this.handleDoneEditing = this.handleDoneEditing.bind(this);
    }

    render() {
        if (this.state.showVideoRecorder) {
            return (
                <VideoRecorder
                    onDoneRecording={this.handleDoneRecording}
                />
            );
        } else {
            return (
                <VideoEditor 
                    onDoneEditing={this.handleDoneEditing}
                    videoFile={this.state.videoFile}
                />
            );
        }
    }

    handleDoneRecording(videoFile) {
        // set the videoFile state and after that set showVideoRecorder to false
        this.setState({ videoFile: videoFile }, () => {
            this.setState({ showVideoRecorder: false });
        });
        // TODO possibly force rerender
    }

    handleDoneEditing() {
        this.setState({ showVideoRecorder: true });
        // TODO possibly force rerender
    }
}
