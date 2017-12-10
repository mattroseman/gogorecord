import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button
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
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleDoneRecording = this.handleDoneRecording.bind(this);
        this.handleDoneEditing = this.handleDoneEditing.bind(this);
    }

    render() {
        if (this.state.accessToken === null) {
            return (
                <Button
                    title='[LOGIN]'
                    onPress={this.handleLogin}
                />
            );
        } else if (this.state.showVideoRecorder) {
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
                />
            );
        }
    }

    handleLogin() {
        // Have user log in
        auth0.webAuth
            .authorize({
                scope: 'openid profile',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                console.log(credentials.accessToken)
                this.setState({ accessToken: credentials.accessToken });
                this.props.onDoneEditing();
            })
            .catch(error => console.log(error));
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
