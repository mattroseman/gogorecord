import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Video from 'react-native-video';
import RNFS from 'react-native-fs';

import UploadVideoButton from '../components/UploadVideoButton.js';
import DeleteVideoButton from '../components/DeleteVideoButton.js';

export default class VideoEditor extends Component {
    constructor(props) {
        super(props);

        this.handleUploadVideo = this.handleUploadVideo.bind(this);
        this.handleDeleteVideo = this.handleDeleteVideo.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
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
                <UploadVideoButton
                    onUploadVideo={this.handleUploadVideo}
                />
                <DeleteVideoButton
                    onDeleteVideo={this.handleDeleteVideo}
                />
            </View>
        );
    }

    handleUploadVideo() {
    }

    handleDeleteVideo() {
        filepath = this.props.navigation.state.params.videoFile;
        console.log(filepath);
        RNFS.exists(filepath)
            .then((result) => {
                console.log('file exists: ', result);

                if (result) {
                    return RNFS.unlink(filepath)
                        .then(() => {
                            console.log('FILE DELETED');
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.error(err);
            });
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
