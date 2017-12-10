import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import Auth0 from 'react-native-auth0';

var credentials = require('../config/auth0-credentials');
const auth0 = new Auth0(credentials);

import UploadVideoButton from './UploadVideoButton';
import DeleteVideoButton from './DeleteVideoButton';

export default class VideoEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { accessToken: null };

        this.handleUploadVideo = this.handleUploadVideo.bind(this);
        this.handleDeleteVideo = this.handleDeleteVideo.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={{uri: this.props.videoFile, mainVer: 1, patchVer: 0}}
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
        // TODO upload video to youtube
        this.props.onDoneEditing();
    }

    handleDeleteVideo() {
        filepath = this.props.videoFile;
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
        this.props.onDoneEditing();
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
