import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export class PlayerNameRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { players, currentRound } = this.props;
    return (
      <View style={styles.container}>
        {players.map((player,index) => {
          const isDealer = (currentRound % players.length) === index;
          return <Text key={index} style={isDealer ? [styles.nameBox, styles.dealer] : styles.nameBox}>{player.key}</Text>
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 30
  },
  nameBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    alignSelf: "center",
    lineHeight: 30,
    height: 100 + "%"
  },
  dealer: {
    backgroundColor: "green",
    overflow: "hidden",
    color: "white"
  }
});

PlayerNameRow.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object)
};
