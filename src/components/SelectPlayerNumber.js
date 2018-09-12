import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { config } from '../config';
import range from 'lodash.range';

const { minPlayers, maxPlayers } = config;

export class SelectPlayerNumber extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.numPlayersContainer}>
        <Text>Select number of players:</Text>
        <View style={{ flexDirection: "row" }}>
          {range(minPlayers, maxPlayers + 1).map((value, index) =>
            <Button key={index} title={value.toString()} onPress={() => this.props.handler(value)} />)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  numPlayersContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
})
