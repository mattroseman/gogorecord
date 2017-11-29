import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

import RecordButton from './components/RecordButton.js';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startRecordingText: '[RECORD]',
            stopRecordingText: '[STOP]',
            recording: false,
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
                </Camera>
            </View>
        );
    }

    handleStartRecording() {
        const options = {
            mode: Camera.constants.CaptureMode.video,
        };

        console.log('test2');

        this.camera.capture(options)
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

        this.setState({
            recording: true,
        });
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
