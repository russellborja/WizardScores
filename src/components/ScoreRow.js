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

  setScoreStyle(showScore, players, playerIndex, rowNumber, currentRound) {
    scoreStyle = [];
    if (players.length > 4) {
      scoreStyle.push(styles.scoreSmall);
    } else {
      scoreStyle.push(styles.scoreBig);
    }

    if (showScore && rowNumber < currentRound) {
      const currentPlayerScore = players[playerIndex].score;
      if ((rowNumber === 0 && currentPlayerScore[rowNumber] >= 0) || (currentPlayerScore[rowNumber] > currentPlayerScore[rowNumber - 1])) {
        scoreStyle.push(styles.scoreWin);
      } else {
        scoreStyle.push(styles.scoreLose);
      }
    }
    return scoreStyle;
  }

  render() {
    const { players, rowNumber, textboxHandler, selectHandler, currentRound, showScore } = this.props;

    return (
      <View style={rowNumber === currentRound ? [styles.row, styles.rowHighlight] : styles.row}>
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
            <Text style={this.setScoreStyle(showScore, players, playerIndex, rowNumber, currentRound)}>{textboxHandler(playerIndex)}</Text>
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
  rowHighlight: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 5
  },
  bidScore: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 1,
    marginRight: 1,
    justifyContent: "center",
    alignItems: "stretch"
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
    textAlign: "center",
    lineHeight: 25,
    fontSize: 15
  },
  scoreBig: {
    flex: 1.5,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    lineHeight: 35,
    fontSize: 20
  },
  scoreWin: {
    backgroundColor: "#e1ef1f",
    overflow: "hidden"
  },
  scoreLose: {
    backgroundColor: "#ff003f",
    overflow: "hidden"
  }
});

ScoreRow.propTypes = {
  rowNumber: PropTypes.number,
  players: PropTypes.arrayOf(PropTypes.object),
  currentRound: PropTypes.number,
  showScore: PropTypes.bool
}
