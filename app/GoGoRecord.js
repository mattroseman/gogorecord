import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    View,
} from 'react-native';

import Auth0 from 'react-native-auth0';

var credentials = require('./config/auth0-credentials');
console.log(credentials);
const auth0 = new Auth0(credentials);

import VideoRecorder from './components/VideoRecorder.js';
import VideoEditor from './components/VideoEditor.js';

export default class GoGoRecord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideoRecorder: true,
            videoFile: '',
            accessToken: null
        };

        this.handleDoneRecording = this.handleDoneRecording.bind(this);
        this.handleDoneEditing = this.handleDoneEditing.bind(this);

        if (this.state.accessToken === null) {
            // Have user log in
            console.log(credentials.domain);
            auth0.webAuth
                .authorize({
                    scope: 'openid profile',
                    audience: 'https://' + credentials.domain + '/userinfo'
                })
                .then(credentials => { 
                    console.log(credentials);
                    this.setState({ accessToken: credentials.accessToken });
                })
                .catch(error => console.log(error));
        }
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
                    accessToken={this.state.accessToken}
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
