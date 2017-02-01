import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Image } from 'react-native';

class Shiparoo extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image source={require('./img/logo.png')}/>

        <Text style={{
            marginBottom: 20,
            fontSize: 30
          }}>Welcome to Shiparoo!</Text>
        <View style={{
            width: 200,
            height: 200
          }}>
          <TextInput
            style={{height: 40}}
            placeholder="Enter Shipment Info"
            onChangeText={(text) => this.setState({text})}
            />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('Shiparoo', () => Shiparoo);
