import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Camera from 'react-native-camera';

import RecordButton from './components/RecordButton.js';
import FlipCameraButton from './components/FlipCameraButton.js';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startRecordingText: '[RECORD]',
            stopRecordingText: '[STOP]',
            recording: false,
            recordTime: 5,
            timeLeft: 5,
            cameraType: Camera.constants.Type.back,
        }

        this.handleStartRecording = this.handleStartRecording.bind(this);
        this.handleStopRecording = this.handleStopRecording.bind(this);
        this.timer = this.timer.bind(this);
        this.handleCameraFlip = this.handleCameraFlip.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type={this.state.cameraType}
                >
                    <FlipCameraButton onCameraFlip={this.handleCameraFlip} />
                    <RecordButton
                        recording={this.state.recording}
                        onStopRecording={this.handleStopRecording}
                        onStartRecording={this.handleStartRecording}
                    />
                    <Text>{this.state.timeLeft}</Text>
                </Camera>
            </View>
        );
    }

    handleStartRecording() {
        const options = {
            mode: Camera.constants.CaptureMode.video,
        };

        this.camera.capture(options)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        this.setState({
            recording: true,
        }, this.timer);
    }

    timer() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                // if the previous timeLeft is 0 then don't keep decreasing
                // this shouldn't happen though
                return { timeLeft: prevState.timeLeft ? prevState.timeLeft - 1: prevState.timeLeft };
            }, () => {
                if (this.state.timeLeft <= 0) {
                    // once the timer has run out
                    this.handleStopRecording();
                    this.setState((prevState) => {
                        return { timeLeft: prevState.recordTime };
                    });
                    clearInterval(this.intervalId);
                } else if (!this.state.recording) {
                    // if the stop recording button is pressed manually
                    this.setState((prevState) => {
                        return { timeLeft: prevState.recordTime };
                    });
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    handleStopRecording() {
        this.camera.stopCapture();

        this.setState({
            recording: false,
        });
    }

    handleCameraFlip() {
        this.setState((prevState) => {
            return { cameraType: prevState.cameraType == Camera.constants.Type.front ? Camera.constants.Type.back : Camera.constants.Type.front };
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
