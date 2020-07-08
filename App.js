import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator  } from 'react-navigation-stack';

import Home from './src/home';
import BMICalculator from './src/bmiCalculator/';
import AgeCalculator from './src/ageCalculator/';
import History from './src/calculationHistory/';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <AppContainer />
    );
  }
}

const AppNavigator =  createStackNavigator(
  {
    home: {
      screen: Home ,
      navigationOptions:{
        header: null
      }
    },
    bmi:{
      screen:BMICalculator ,
      navigationOptions:{
        header: null
      }
    },
    age: {
      screen: AgeCalculator  ,
      navigationOptions:{
        header: null
      }
  },
  },
  {
    initialRouteName: "home"
  }
);

const AppContainer = createAppContainer(AppNavigator);
