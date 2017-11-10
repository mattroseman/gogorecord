import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Countdown extends Component {
    render() {
        return (
            <Text>{this.props.timeLeft}</Text>
        );
    }
}
