import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { SelectPlayerNumber, SelectPlayerName } from '../components';
import { config } from '../config';
import range from 'lodash.range';
import clonedeep from 'lodash.clonedeep';

const { totalCards } = config;

const initPlayer = (numPlayers) => range(0, totalCards / numPlayers).map(() => 0);

export class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNameInputVisible: false,
      numPlayers: 0,
      players: [],
      currentRound: 0
    }
  }

  onPlayerNumberPress = (numPlayers) => {
    this.setState({
      numPlayers,
      isNameInputVisible: true,
      players: range(0, numPlayers).map((value, index) => ({
        key: `Player ${index + 1}`,
        score: initPlayer(numPlayers),
        bid: initPlayer(numPlayers),
        tricksWon: initPlayer(numPlayers)
      }))
    });
  }

  onPlayerNameEdit = (text, index) => {
    const newPlayerState = clonedeep(this.state.players);
    newPlayerState[index].key = text;
    this.setState({
      players: newPlayerState
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>LET'S PLAY WIZARD!</Text>
        <SelectPlayerNumber handler={this.onPlayerNumberPress} />
        <SelectPlayerName handler={this.onPlayerNameEdit}
          visible={this.state.isNameInputVisible}
          numPlayers={this.state.numPlayers} />

        {this.state.isNameInputVisible &&
          <Button
            style={styles.title}
            title="START"
            onPress={() => {
              this.props.navigation.navigate('Score', {
                players: this.state.players,
                currentRound: this.state.currentRound
              })
            }}
          />}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 30
  }
})
