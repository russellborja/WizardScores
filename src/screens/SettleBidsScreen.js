import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { ScoreGrid } from '../components';
import range from 'lodash.range';
import clonedeep from 'lodash.clonedeep';

export class SettleBidsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: this.props.navigation.getParam('players'),
      currentRound: this.props.navigation.getParam('currentRound')
    }
  }

  onTricksWonChange = (playerIndex, roundNumber, tricksWon) => {
    let newPlayerState = this.state.players;
    newPlayerState[playerIndex].tricksWon[roundNumber] = tricksWon;
    this.setState({
      players: newPlayerState
    });
  }

  computeScore = (bids, tricksWon, scores, roundNumber) => {
    const bid = bids[roundNumber];
    const tricks = tricksWon[roundNumber];
    let oldScore;
    let newScore;

    if (roundNumber === 0) {
      oldScore = scores[roundNumber]
    } else {
      oldScore = scores[roundNumber - 1]
    }

    if (bid === tricks) {
      newScore = oldScore + 20 + (tricks * 10);
    } else {
      newScore = oldScore - (Math.abs(tricks - bid) * 10);
    }

    let updatedScores = scores;
    updatedScores[roundNumber] = newScore;
    return updatedScores;
  }

  updatePlayerScores = (players, roundNumber) => {
    return new Promise((resolve, reject) => {
      const newPlayerState = range(0, players.length).map((value, index) => ({
        key: players[index].key,
        score: this.computeScore(players[index].bid, players[index].tricksWon, players[index].score, roundNumber),
        bid: players[index].bid,
        tricksWon: players[index].tricksWon
      }));

      this.setState({
        players: newPlayerState,
        currentRound: roundNumber + 1
      }, () => resolve(this.state));
    });
  }

  render() {
    const { players, currentRound } = this.state;

    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <ScoreGrid players={players} showScore={false} selectHandler={this.onTricksWonChange} currentRound={currentRound}/>
        <View style={{ flex: 0.15 }}>
          <Button title="Compute Score" onPress={() => {
            const prevPlayers = clonedeep(players);
            this.updatePlayerScores(prevPlayers, currentRound)
              .then((state) => {
                this.props.navigation.push('Score', {
                  players: state.players,
                  currentRound: state.currentRound
                })
              });
          }} />
        </View>
      </View>
    )
  }
}
