import React, { Component } from 'react';
import { Text,
  TextInput,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import AllPackages from './all_packages';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {tracking_number: ''};
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

        <Image source={require("../img/logo.png")}/>

        <Text style={{
            fontSize: 30,
            margin: 20
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
            onChangeText={(tracking_number) => this.setState({tracking_number})}
            />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.tracking_number.split(' ').map((word) => word && '🍕').join(' ')}
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
