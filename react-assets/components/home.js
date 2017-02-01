import React, { Component } from 'react';
import { Text,
  TextInput,
  View,
  TouchableHighlight,
  Image
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-checkbox';

import AllPackages from './all_packages';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracking_number: '',
      carrier: '',
      phone_number: '',
      realtime_updates: false
    };
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
            margin: 20,
            borderRadius: 5,
            padding: 10,
          }}>
          Welcome to Shiparoo!
        </Text>

        <View style={{
            height: 40,
            width: 310,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20
          }}>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderWidth: 1,
              padding: 10,
            }}
            placeholder="Tracking Number"
            onChangeText={(tracking_number) => this.setState({tracking_number})}/>

          <ModalDropdown
            style={{
              height: 40,
              width: 75,
              borderWidth: 1,
              borderLeftWidth: 0,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            dropdownStyle={{
              width: 100
            }}
            adjestFrame={{left: 100}}
            options={
              ['UPS',
               'USPS',
               'FedEX',
               'Canada Post',
               'Lasership',
               'DHL Express',
               'Mondail Relay']}
            defaultValue={'Carrier'}
            onSelect={(carrier) => this.setState({ carrier: carrier })}/>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TextInput
            style={{
              height: 40,
              width: 275,
              borderWidth: 1,
              padding: 10,
              marginBottom: 20
            }}
            placeholder="Phone Number (Optional)"
            onChangeText={(phone_number) => this.setState({ phone_number: phone_number })}/>

          <CheckBox
            label='Receive real-time updates?'
            checked={ this.state.realtime_updates }
            onChange={(checked) => this.setState({ realtime_updates: !this.state.realtime_updates })}/>
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
