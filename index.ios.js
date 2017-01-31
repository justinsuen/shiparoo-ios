import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class Shiparoo extends Component {
  render() {
    return (
      <Text>Welcome to Shiparoo!</Text>
    );
  }
}

AppRegistry.registerComponent('Shiparoo', () => Shiparoo);
