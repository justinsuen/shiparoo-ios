import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight, StyleSheet } from 'react-native';

class ShowPackage extends Component {
  constructor(props) {
    super(props);

    this._handleBackPress = this._handleBackPress.bind(this);
  }

  _handleBackPress() {
      this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.view}>
        <TouchableHighlight style={{
            padding: 15
          }}
          onPress={this._handleBackPress}>
          <Text>Home</Text>
        </TouchableHighlight>
        <Text style={styles.carrierText}>
          {carriers[this.props.carrier]}
        </Text>
        <Text style={styles.trackingNumberText}>
          Tracking No.:
          {this.props.trackingNumber}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'flex-start',
  },
  carrierText: {
    fontSize: 25,
    marginTop: 40,
    marginBottom: 20,
    color: 'black',
    textAlign: 'left',
  },
  trackingNumberText: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    color: 'black',
    textAlign: 'left',
  },
});

const carriers = {
  'ups': 'UPS',
  'usps': 'USPS',
  'fedex': 'FedEX',
  'canada_post': 'Canada Post',
  'lasership': 'Lasership',
  'dhl_express': 'DHL Express',
  'mondial_relay': 'Mondial Relay'
};

export default ShowPackage;
