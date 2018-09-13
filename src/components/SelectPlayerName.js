import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import range from 'lodash.range';

export class SelectPlayerName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.visible && range(0, this.props.numPlayers).map((value, index) => (
        <TextInput style={styles.playerInput} key={index} onChangeText={(text) => this.props.handler(text, index)}
          placeholder={index === 0 ? `Enter Dealer's Name` : `Enter Player ${index + 1} Name`}>
        </TextInput>
      ))
    )
  }
}

const styles = StyleSheet.create({
  playerInput: {
    borderWidth: 1,
    width: 80 + "%",
    height: 10 + "%",
    textAlign: "center",
    fontSize: 25
  }
})
