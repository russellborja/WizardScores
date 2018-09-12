import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export class PlayerNameRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.players.map((player,index) => {
          return <Text key={index} style={styles.nameBox}>{player.key}</Text>
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
    height: 100 + "%"
  }
});

PlayerNameRow.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object)
};
