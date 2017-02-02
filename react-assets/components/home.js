import React, { Component } from 'react';
import { Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Alert,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-checkbox';
import Button from 'apsl-react-native-button';

import AllPackages from './all_packages';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackingNumber: '',
      carrier: '',
      phoneNumber: '',
      realtimeUpdates: false,
      processing: false
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.handleValidTracking = this.handleValidTracking.bind(this);
    this.validPhoneNumber = this.validPhoneNumber.bind(this);
    this.createPackage = this.createPackage.bind(this);
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

  buttonText() {
    if (this.state.processing) {
      return "Processing Request";
    } else {
      return this.trackButtonText();
    }
  }

  trackButtonText() {
    if (this.state.phoneNumber === "") {
      return "Find My Package";
    } else {
      return "Track My Package";
    }
  }

  startTracking() {
    const url = `https://api.goshippo.com/v1/tracks/${this.state.carrier}/${this.state.trackingNumber}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        if (data.tracking_status !== null) {
          this.handleValidTracking();
        } else {
          Alert.alert('Invalid tracking number or carrier.');
          this.setState({ processing: false });
        }
      })
      .catch(() => {
        Alert.alert('Invalid tracking number or carrier.');
        this.setState({ processing: false });
      });
  }

  handleValidTracking() {
    if (this.validPhoneNumber(this.state.phoneNumber)) {
      this.createPackage();
    } else {
      Alert.alert('Invalid phone number.');
      this.setState({ processing: false });
    }
  }

  validPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return (phoneNumber.match(/\d{10}/) !== null);
  }

  createPackage() {
    return fetch('http://localhost:3000/packages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package: {
          tracking_number: this.state.trackingNumber,
          carrier: this.state.carrier,
          phone_number: this.state.phoneNumber,
          realtime_updates: this.state.realtimeUpdates
        }
      })
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      Alert.alert('Error in creating package. Check your parameters!');
      this.setState({ processing: false });
    });
  }

  onButtonPress() {
    this.setState({ processing: true });
    this.startTracking();
  }

  disableButton() {
    if (this.state.processing) {
			return true;
		} else if (this.state.carrier === "") {
			return true;
		} else if (this.state.trackingNumber === "") {
			return true;
		} else if (this.state.phoneNumber === "") {
			return false;
		} else {
			return !this.validPhoneNumber(this.state.phoneNumber);
		}
  }

  render() {
    return (
      <Image source={require("../img/splash.jpg")}
        style={{
          flex: 1,
          width: undefined,
          height: undefined,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <View
          style={{
            alignItems: 'flex-start'
          }}>
          <Image source={require('../img/logo_white.png')}
            style={{
              height: 50,
              width: 50,
              resizeMode: 'contain',
              marginBottom: 20,
          }}/>
          {/*Title*/}
          <Text style={{
              fontSize: 25,
              marginBottom: 20,
              alignItems: 'flex-end',
              color: 'white'
            }}>
            Welcome to Shiparoo.
          </Text>
          {/*Motto*/}
          <Text style={{
              fontSize: 18,
              color: 'white',
              marginBottom: 20
            }}>
            Never lose track of a package again.
          </Text>

          <View style={{
              width: 310,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
              padding: 30,
              borderRadius: 5,
              borderWidth: 1,
              backgroundColor: 'white'
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
                onChangeText={(trackingNumber) => this.setState({trackingNumber})}/>

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
                  width: 275,
                  marginBottom: 20
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 20,
                  }}
                  placeholder="Phone Number (Optional)"
                  onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })}/>

                <CheckBox
                  label='Receive real-time updates?'
                  checked={ this.state.realtimeUpdates }
                  onChange={(checked) => this.setState({ realtimeUpdates: !this.state.realtimeUpdates })}/>
              </View>

              <Button
                onPress={this.onButtonPress}
                style={{
                  backgroundColor: '#5ed1b8',
                }}
                textStyle={{
                  color: 'white'
                }}
                isDisabled={this.disableButton()}>
                {this.buttonText()}
              </Button>
            </View>
        </View>


        <TouchableHighlight style={{
            height: 50
          }}
          onPress={ () => this._navigate() }>
          <Text>All Packages</Text>
        </TouchableHighlight>
      </Image>
    );
  }
}

export default Home;
