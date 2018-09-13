import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ScoreRow } from './ScoreRow';
import { PlayerNameRow } from './PlayerNameRow';
import { config } from '../config';
import PropTypes from 'prop-types';
import range from 'lodash.range';

export class ScoreGrid extends Component {
  constructor(props) {
    super(props);
  }

  getNumRounds(players) {
    const numRounds = config.totalCards / players.length;
    return range(0, numRounds).map(index => ({ key: index.toString() }));
  }

  renderItem = ({ item, index }) => {
    const { players, showScore, selectHandler, currentRound } = this.props;
    return <ScoreRow players={players} rowNumber={index} currentRound={currentRound} showScore={showScore}
      textboxHandler={(playerIndex) => showScore ? players[playerIndex].score[index] : players[playerIndex].bid[index]}
      selectHandler={(playerIndex, option) => selectHandler(playerIndex, index, option)}
    />
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <PlayerNameRow players={this.props.players} currentRound={this.props.currentRound}/>
        <FlatList
          data={this.getNumRounds(this.props.players)}
          renderItem={this.renderItem}
          style={styles.container}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

ScoreGrid.propTypes = {
  numRounds: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.object),
  currentRound: PropTypes.number
};
