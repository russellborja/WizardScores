import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { ScoreGrid } from '../components';
import clonedeep from 'lodash.clonedeep';

export class ScoreScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: this.props.navigation.getParam('players'),
      currentRound: this.props.navigation.getParam('currentRound')
    }
  }

  onBidChange = (playerIndex, roundNumber, newBid) => {
    newPlayerState = clonedeep(this.state.players);
    newPlayerState[playerIndex].bid[roundNumber] = newBid;
    this.setState({
      players: newPlayerState
    });
  }

  render() {
    const { players, currentRound } = this.state;

    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <ScoreGrid players={players} showScore={true} selectHandler={this.onBidChange} currentRound={currentRound} />
        <View style={{ flex: 0.15 }}>
          <Button title="Record Tricks Won" onPress={() => this.props.navigation.push('SettleBids', {
            players,
            currentRound
          })}/>
        </View>
      </View>
    )
  }
}
