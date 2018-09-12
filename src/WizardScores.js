import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { HomeScreen, ScoreScreen, SettleBidsScreen } from './screens';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Score: ScoreScreen,
    SettleBids: SettleBidsScreen
  }, 
  {
    initialRouteName: 'Home'
  }
);

export class WizardScores extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RootStack />
    )
  }
}
