import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, AlertIOS } from 'react-native';
import { ScoreGrid } from '../components';
import { StackActions, NavigationActions } from 'react-navigation';
import clonedeep from 'lodash.clonedeep';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

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
    const lastRound = 60 / players.length;

    return (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <ScoreGrid players={players} showScore={true} selectHandler={this.onBidChange} currentRound={currentRound} />
        <View style={styles.bottomContainer}>
          <Text style={{ fontSize: 20 }}>{currentRound < lastRound ? `Round ${currentRound + 1} of ${lastRound}` : 'Game Over!'}</Text>
          {currentRound < lastRound ? < Button title="Record Tricks Won" onPress={() => this.props.navigation.push('SettleBids', {
            players,
            currentRound
          })} /> : null}
          <Button title="New Game" onPress={() => {
            AlertIOS.alert(
              'Are you sure?',
              'Selecting a new game will remove all history',
              [
                { text: 'OK', onPress: () => this.props.navigation.dispatch(resetAction) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              ]
            );
          }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});
