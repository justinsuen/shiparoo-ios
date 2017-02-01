import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight } from 'react-native';

import AllPackages from './all_packages';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _navigate(){
    this.props.navigator.push({
      name: 'All Packages'
    });
  }

  renderScene(route, navigator) {
    if(route.name === 'All Packages') {
      return <AllPackages navigator={navigator} />;
    }
  }

  render() {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{
            marginBottom: 20,
            fontSize: 30
          }}>
          Welcome to Shiparoo!
        </Text>
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
        <TouchableHighlight style={{
            height: 50
          }}
          onPress={ () => this._navigate() }>
          <Text>All Packages</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Home;
