import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight, StyleSheet, ListView } from 'react-native';

class ShowPackage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      carrier: 'usps',
      trackingNumber: '9205590136271836203422',
      details: {},
      dataSource: ds.cloneWithRows([])
    };

    this._handleBackPress = this._handleBackPress.bind(this);
    this.getPackageDetails = this.getPackageDetails.bind(this);
  }

  componentWillMount() {
    this.getPackageDetails();
    console.log("getting package details")
  }

  _handleBackPress() {
      // this.props.navigator.pop();
  }

  getPackageDetails() {
    const url = `https://api.goshippo.com/v1/tracks/${this.state.carrier}/${this.state.trackingNumber}`;
    console.log(url);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        this.setState({details: data});
        let visited_locations = [];
        for (let a = 0; a < data.tracking_history.length; a++) {
          let loc_str = this.getAddress(data.tracking_history[a] + ": ")
          visited_locations.push(
            Date.parse(det.tracking_history[a].status_date) + ": "
              + this.getAddress(det.tracking_history[a])
          );
          console.log(visited_locations);
        }
        this.setState({dataSource: this.state.dataSource.cloneWithRows(visited_locations)});

      });
  }

  getAddress(location) {
    let address_str = "";
    let keys = Object.keys(location);
    for (let index in keys) {
      address_str += location[keys[index]];
      if (keys[index] === "city") address_str += ",";
      if (keys[index] !== "country" && keys[index] !== "") address_str += " ";
    }
    return address_str;
  }

  render() {
    let fromAddress = "", toAddress = "", status = "", status_details = "";
    let status_date = "", curr_location = "";
    if (this.state.details.tracking_status) {
      let det = this.state.details;
      fromAddress = this.getAddress(det.address_from);
      toAddress = this.getAddress(det.address_to);
      status = det.tracking_status.status;
      status_details = det.tracking_status.status_details;
      status_date = Date.parse(det.tracking_status.status_date).toString();
      curr_location = this.getAddress(det.tracking_status.location);
    }

    return (
      <View style={styles.view}>
        <TouchableHighlight style={{
            padding: 15
          }}
          onPress={this._handleBackPress}>
          <Text>Home</Text>
        </TouchableHighlight>
        <Text style={styles.carrierText}>
          {carriers[this.state.carrier]}
        </Text>
        <Text style={styles.trackingNumberText}>
          Tracking No.:
          {this.state.trackingNumber}
        </Text>
        <Text style={styles.detailsText}>
          {status}{"\n"}
          {status_details}{"\n"}
          {status_date}: {curr_location}{"\n"}

          From: {fromAddress}{"\n"}
          To: {toAddress}{"\n"}
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
  detailsText: {
    fontSize: 20,
    marginTop: 10,
    color: 'black',
  }
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
