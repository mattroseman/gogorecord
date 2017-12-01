import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export default class DeleteVideoButton extends Component {
    constructor(props) {
        super(props);

        this.deleteVideoButtonText = '[DELETE]';
    }

    render() {
        return (
            <Text style={styles.delete} onPress={this.props.onDeleteVideo}>
                {this.deleteVideoButtonText}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    delete: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 40,
        width: 85,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
