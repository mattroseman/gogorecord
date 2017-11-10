import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

import RecordButton from './components/RecordButton.js';
import Countdown from './components/Countdown.js';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startRecordingText: '[RECORD]',
            stopRecordingText: '[STOP]',
            recording: false,
            recordTime: 60,
            timeLeft: 60,
        }

        this.handleStartRecording = this.handleStartRecording.bind(this);
        this.handleStopRecording = this.handleStopRecording.bind(this);
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
                >
                    <RecordButton
                        recording={this.state.recording}
                        onStopRecording={this.handleStopRecording}
                        onStartRecording={this.handleStartRecording}
                    />
                    <Countdown timeLeft={this.state.timeLeft} />
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
        });

        // create an interval to decrement timeLeft every second
        var intervalId = setInterval(() => {
            console.log(this.state.timeLeft);
            this.setState((prevState) => {
                timeLeft: prevState.timeLeft--
            }, () => {
                console.log('test');
                // If the timeLeft is zero clear this interval, stop recording
                // and reset timeLeft
                if (this.state.timeLeft <= 0) {
                    clearInterval(intervalId);
                    this.handleStopRecording();
                    this.setState((prevState) => {
                        timeLeft: prevState.recordTime
                    });
                }

                // if handleStopRecording is called by other means
                // then clear the interval and reset timeLeft
                if (!this.state.recording) {
                    clearInterval(intervalId);
                    this.setState((prevState) => {
                        timeLeft: prevState.recordTime
                    });
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
