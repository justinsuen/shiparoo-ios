import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  TextInput,
  Alert } from 'react-native';
import Button from 'apsl-react-native-button';

class VerifyPIN extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packagePin: this.props.navigator.state.routeStack[1].packagePin,
      pinToVerify: ''
    };

    this._handleBackPress = this._handleBackPress.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  onButtonPress() {
    if (this.state.packagePin === this.state.pinToVerify) {
      this.verifyPackage();
      console.log("render show");
    } else {
      Alert.alert('SIKE. THATS THE WRONG NUMBA.');
    }
  }

  disableButton() {
    if (this.state.pinToVerify === '') {
      return true;
    } else return false;
  }

  verifyPackage() {
    console.log("verifying");
  }

  render() {
    return(
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>

        <View>
          <Text>1. Find your PIN in your messages</Text>
          <Text>2. Enter your PIN below</Text>
          <TextInput
            style={{
              height: 40,
              color: 'black',
              borderWidth: 1
            }}
            autoFocus={true}
            tintColor={'black'}
            keyboardType={'numeric'}
            onChangeText={(pinToVerify) => this.setState({ pinToVerify })}/>
            <Button
              onPress={this.onButtonPress}
              style={{
                height: 35,
                borderWidth: 1,
                backgroundColor: '#ededef',
              }}
              textStyle={{
                fontSize: 15,
                color: 'black'
              }}
              isDisabled={this.disableButton()}>
              VERIFY YO PIN BOIIIIII
            </Button>
        </View>


        <TouchableHighlight style={{
            padding: 15
          }}
          onPress={this._handleBackPress}>
          <Text>Back</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default VerifyPIN;
