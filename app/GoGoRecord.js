'use strict';
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startRecordingText: '[RECORD]',
            stopRecordingText: '[STOP]',
            recording: false,
        }

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
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
                    <Text style={styles.capture} onPress={this.state.recording ? this.stopRecording : this.startRecording}>
                        {this.state.recording ? this.state.stopRecordingText : this.state.startRecordingText}
                    </Text>
                </Camera>
            </View>
        );
    }

    startRecording() {
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

    stopRecording() {
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
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
