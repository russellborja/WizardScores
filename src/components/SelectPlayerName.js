import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import range from 'lodash.range';

export class SelectPlayerName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.visible && range(0, this.props.numPlayers).map((value, index) => (
        <TextInput key={index} onChangeText={(text) => this.props.handler(text, index)}>
          {`Player ${index + 1}`}
        </TextInput>
      ))
    )
  }
}
