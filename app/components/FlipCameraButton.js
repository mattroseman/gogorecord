import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export default class FlipCameraButton extends Component {
    constructor(props) {
        super(props);

        this.flipCameraText = '[FLIP]';
    }

    render() {
        return (
            <Text style={styles.flipcamera} onPress={this.props.onCameraFlip}>
                {this.flipCameraText}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    flipcamera: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
