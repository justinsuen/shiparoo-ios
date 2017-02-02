import React, { Component } from 'react';
import { Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-checkbox';
import Button from 'react-native-button';

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

    this.onButtonPress = this.onButtonPress.bind(this);
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

  onButtonPress() {
    return fetch('http://localhost:3000/packages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package: {
          tracking_number: this.state.tracking_number,
          carrier: this.state.carrier,
          phone_number: this.state.phone_number,
          realtime_updates: this.state.realtime_updates
        }
      })
    }).then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Image source={require("../img/logo.png")}
          style={{
            height: 150,
            resizeMode: 'contain'
          }}/>

        {/*Title*/}
        <Text style={{
            fontSize: 30,
            margin: 15,
            borderRadius: 5,
            padding: 10,
          }}>
          Shiparoo
        </Text>

        <View style={{
            width: 310,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            padding: 30,
            borderRadius: 5,
            borderWidth: 1
          }}>

          {/*Tracking Number and Carrier*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
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
                alignItems: 'center',
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
                onSelect={(idx, val) => this.setState({ carrier: val })}/>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 275
            }}>
            <TextInput
              style={{
                height: 40,
                borderWidth: 1,
                padding: 10,
                marginBottom: 20,
              }}
              placeholder="Phone Number (Optional)"
              onChangeText={(phone_number) => this.setState({ phone_number: phone_number })}/>

            <CheckBox
              label='Receive real-time updates?'
              checked={ this.state.realtime_updates }
              onChange={(checked) => this.setState({ realtime_updates: !this.state.realtime_updates })}/>
          </View>
        </View>

        <Button
          containerStyle={{
            padding: 10,
            height: 40,
            width: 310,
            borderRadius: 5,
            backgroundColor: "#e8482e"
          }}
          style={{
            color: 'white'
          }}
          onPress={this.onButtonPress}
          color="#841584">
          Send Pin
        </Button>

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
