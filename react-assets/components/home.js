import React, { Component } from 'react';
import { Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  Alert,
  PickerIOS
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import Button from 'apsl-react-native-button';
import ModalPicker from 'react-native-modal-picker';

import AllPackages from './all_packages';
import VerifyPIN from './verify_pin';
import ShowPackage from './show_package';

const carriers = [
  { key: 'ups', label: 'UPS'},
  { key: 'usps', label: 'USPS'},
  { key: 'fedex', label: 'FedEX'},
  { key: 'canada_post', label: 'Canada Post'},
  { key: 'lasership', label: 'Lasership'},
  { key: 'dhl_express', label: 'DHL Express'},
  { key: 'mondial_relay', label: 'Mondial Relay'},
];

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackingNumber: '',
      carrier: '',
      phoneNumber: '',
      realtimeUpdates: false,
      processing: false,
      carrierShow: ''
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.startTracking = this.startTracking.bind(this);
    this.handleValidTracking = this.handleValidTracking.bind(this);
    this.validPhoneNumber = this.validPhoneNumber.bind(this);
    this.createPackage = this.createPackage.bind(this);

    this._navigateToShow = this._navigateToShow.bind(this);
  }

  _navigate(){
    this.props.navigator.push({
      name: 'All Packages'
    });
  }

  _navigateVerify(pack) {
    this.props.navigator.push({
      name: 'Verify PIN',
      package: pack
    });
  }

  _navigateToShow() {
    this.props.navigator.push({
      name: 'Show Package',
      passProps: {
        carrier: this.state.carrier,
        trackingNumber: this.state.trackingNumber
      }
    });
  }

  renderScene(route, navigator) {
    if (route.name === 'All Packages') {
      return <AllPackages navigator={navigator} />;
    }
    if (route.name === 'Verify PIN') {
      return <VerifyPIN navigator={navigator} />;
    }
    if (route.name === 'Show Package') {
      return <ShowPackage navigator={navigator} {...route.passProps}/>;
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
      return "Find Package";
    } else {
      return "Receive Updates";
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
        if (data.tracking_status) {
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
    if (this.state.phoneNumber !== "") {
      if (this.validPhoneNumber(this.state.phoneNumber)) {
        this.setState({ realtimeUpdates: true });
        this.createPackage();
      } else {
        Alert.alert('Invalid phone number.');
        this.setState({ processing: false });
      }
    } else {
      this.setState({ processing: false });
      this._navigateToShow();
    }
  }

  validPhoneNumber(phoneNumber) {
    if (phoneNumber.length !== 10) {
      return false;
    }
    return (phoneNumber.match(/\d{10}/) !== null);
  }

  createPackage() {
    return fetch('http://localhost:3000/api/packages', {
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
      if (data.package.verified === true) {
        this.setState({ processing: false });
        this._navigateToShow();
      } else {
        this.setState({ processing: false });
        this._navigateVerify(data.package);
      }
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
      <Image source={require('../img/splash.jpg')}
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
            alignItems: 'flex-start',
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
              marginBottom: 40
            }}>
            Never lose track of a package again.
          </Text>

          {/*Carrier*/}
          <View
            style={{
              marginBottom: 20,
            }}>
            <ModalPicker
              data={carriers}
              style={{
                backgroundColor: 'transparent',
                borderRadius: 5,
                borderColor: 'white',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onChange={(option) => this.setState({carrier: option.key, carrierShow: option.label})}>

              <TextInput
                style={{
                  width: 125,
                  height: 30,
                  fontSize: 12,
                  color: 'white',
                  paddingLeft: 10
                }}
                editable={false}
                placeholder="SELECT CARRIER"
                placeholderTextColor="white"
                value={this.state.carrierShow} />
            </ModalPicker>
          </View>

          <View style={{
              flexDirection: 'column',
              marginBottom: 20,
            }}>

            {/*Tracking Number*/}
            <View
              style={{
                marginBottom: 20,
                width: 300
              }}>
              <View style={{
                  borderBottomWidth: 1,
                  borderColor: 'white',}}>
                <Text style={{
                    fontSize: 12,
                    color: 'white'
                  }}>
                  TRACKING NUMBER
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    color: 'white',
                  }}
                  autoFocus={true}
                  tintColor={'white'}
                  keyboardType={'numeric'}
                  onChangeText={(trackingNumber) => this.setState({trackingNumber})}/>
              </View>

            </View>


            {/*Phone Number*/}
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 20
              }}>
              <View style={{
                  borderBottomWidth: 1,
                  borderColor: 'white',
                  marginBottom: 20 }}>
                <Text style={{
                    fontSize: 12,
                    color: 'white'
                  }}>
                  PHONE NUMBER (OPTIONAL)
                </Text>
              <TextInput
                style={{
                  height: 40,
                  width: 200,
                  color: 'white',
                }}
                tintColor={'white'}
                keyboardType={'phone-pad'}
                onChangeText={(phoneNumber) => this.setState({ phoneNumber: phoneNumber })}/>
              </View>
            </View>

              <Button
                onPress={this.onButtonPress}
                style={{
                  height: 35,
                  borderWidth: 1,
                  borderColor: 'white',
                  backgroundColor: 'transparent',
                }}
                textStyle={{
                  fontSize: 15,
                  color: 'white'
                }}
                isDisabled={this.disableButton()}>
                {this.buttonText()}
              </Button>
            </View>
        </View>


        {/*<TouchableHighlight style={{
            height: 50
          }}
          onPress={ () => this._navigate() }>
          <Text>All Packages</Text>
        </TouchableHighlight>*/}
      </Image>
    );
  }
}

export default Home;
