import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  Image,
  Alert } from 'react-native';
import Button from 'apsl-react-native-button';

class VerifyPIN extends Component {
  constructor(props) {
    super(props);

    this.state = {
      package: this.props.navigator.state.routeStack[1].package,
      pinToVerify: '',
      processing: false,
      carrierToPass: '',
      trackingNumberToPass: ''
    };

    this._handleBackPress = this._handleBackPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  onButtonPress() {
    this.setState({ processing: true });

    if (this.state.package.pin === this.state.pinToVerify) {
      this.verifyPackage();
    } else {
      this.setState({ processing: false });
      Alert.alert('SIKE. THATS THE WRONG NUMBA.');
    }
  }

  _navigateToShow() {
    this.props.navigator.push({
      name: 'Show Package',
      passProps: {
        carrier: this.state.package.carrier,
        trackingNumber: this.state.package.tracking_number
      }
    });
  }

  disableButton() {
    if (this.state.processing) {
      return true;
    } else if (this.state.pinToVerify === '') {
      return true;
    } else return false;
  }

  verifyPackage() {
    return fetch(`http://localhost:3000/api/packages/${this.state.package.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        package: {
          pin: this.state.pinToVerify,
          tracking_number: this.state.package.tracking_number,
          carrier: this.state.package.carrier
        }
      })
    }).then((response) => response.json())
      .then((data) => {
        this.setState({ processing: false });
        this._navigateToShow();
    });
  }

  render() {
    return(
      <Image source={require('../img/splash.jpg')}
        style={{
          flex: 1,
          width: undefined,
          height: undefined,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>


          <View
            style={{
              alignItems: 'center',
            }}>

            <Text style={{
                fontSize: 18,
                color: 'white',
                marginBottom: 20
              }}>
              Find your PIN in your messages
            </Text>

            <View style={{ borderBottomWidth: 1, borderColor: 'white', marginBottom: 50, width: 75 }}>
              <Text style={{ fontSize: 11, color: 'white', textAlign: 'center' }}>
                PIN
              </Text>
              <TextInput
                style={{
                  textAlign: 'center',
                  height: 40,
                  color: 'white',
                }}
                autoFocus={true}
                tintColor={'white'}
                keyboardType={'numeric'}
                onChangeText={(pinToVerify) => this.setState({ pinToVerify })}/>
            </View>

          </View>
          <View style={{ width: 100, flexDirection: 'row', justifyContent: 'center' }}>
            <Button style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 75,
                height: 35,
                borderColor: 'white',
                backgroundColor: 'transparent',
                marginRight: 20
              }}
              textStyle={{
                fontSize: 15,
                color: 'white'
              }}
              onPress={this._handleBackPress}>
              Back
            </Button>
            <Button
              onPress={this.onButtonPress}
              style={{
                height: 35,
                width: 75,
                borderWidth: 1,
                borderColor: 'white',
                backgroundColor: 'transparent',
                alignItems: 'center'
              }}
              textStyle={{
                fontSize: 15,
                color: 'white'
              }}
              isDisabled={this.disableButton()}>
              Submit
            </Button>
          </View>


      </Image>
    );
  }
}

export default VerifyPIN;
