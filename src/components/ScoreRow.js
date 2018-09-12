import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import PropTypes from 'prop-types';
import range from 'lodash.range';
import clonedeep from 'lodash.clonedeep';

export class ScoreRow extends Component {
  constructor(props) {
    super(props);
  }

  getBidOptions(rowNumber) {
    let index = 0;
    const bidTitle = [{ key: 0, section: true, label: 'Select bid' }];
    const bidOptions = range(0, rowNumber + 2).map(index => ({
      key: index + 1,
      label: index.toString()
    }));

    return bidTitle.concat(bidOptions);
  }

  showPreviousBids(showScore, rowNumber, currentRound, player) {
    if (rowNumber < currentRound) {
      return showScore ? player.bid[rowNumber].toString() : player.tricksWon[rowNumber].toString();
    }
    return '-';
  }

  render() {
    const { players, rowNumber, textboxHandler, selectHandler, currentRound, showScore } = this.props;

    return (
      <View style={styles.row}>
        {players.map((player, playerIndex) =>
          <View key={playerIndex} style={styles.bidScore}>
            <ModalSelector
              data={this.getBidOptions(rowNumber)}
              initValue={this.showPreviousBids(showScore, rowNumber, currentRound, clonedeep(player))}
              disabled={rowNumber === currentRound ? false : true}
              style={styles.bid}
              selectTextStyle={players.length > 4 ? styles.bidTextSmall : {}}
              onChange={(option) => selectHandler(playerIndex, option.label)}>
            </ModalSelector>
            <Text style={players.length > 4 ? styles.scoreSmall : styles.scoreBig}>{textboxHandler(playerIndex)}</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    margin: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bidScore: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 1,
    marginRight: 1
  },
  bid: {
    flex: 1,
    padding: 0
  },
  bidTextSmall: {
    fontSize: 9
  },
  scoreSmall: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center"
  },
  scoreBig: {
    flex: 1.5,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center"
  }
});

ScoreRow.propTypes = {
  rowNumber: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.object),
  currentRound: PropTypes.number,
  showScore: PropTypes.bool
}
