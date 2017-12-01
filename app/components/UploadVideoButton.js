import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export default class UploadVideoButton extends Component {
    constructor(props) {
        super(props);

        this.uploadVideoButtonText = '[UPLOAD]';
    }

    render() {
        return (
            <Text style={styles.upload} onPress={this.props.onUploadVideo}>
                {this.uploadVideoButtonText}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    upload: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 40,
        width: 85,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
