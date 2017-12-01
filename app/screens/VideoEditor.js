import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';

import Video from 'react-native-video';

export default class VideoEditor extends Component {
    constructor(props) {
        super(props);

        console.log(props.videoFile);
    }

    render() {
        return (
            <Video
                source={{uri: this.props.navigation.state.params.videoFile, mainVer: 1, patchVer: 0}}
                rate={1.0}
                volume={1.0}
                muted={false}
                paused={false}
                resizeMode="cover"
                repeat={true}
                style={styles.backgroundVideo}
            />
        );
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
