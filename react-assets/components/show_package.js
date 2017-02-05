import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight, StyleSheet, ListView } from 'react-native';

class ShowPackage extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      carrier: this.props.carrier,
      trackingNumber: this.props.trackingNumber,
      details: {},
      dataSource: ds.cloneWithRows([])
    };

    this._handleBackPress = this._handleBackPress.bind(this);
    this.getPackageDetails = this.getPackageDetails.bind(this);
  }

  componentWillMount() {
    this.getPackageDetails();
  }

  _handleBackPress() {
      this.props.navigator.pop();
  }

  getPackageDetails() {
    const url = `https://api.goshippo.com/v1/tracks/${this.state.carrier}/${this.state.trackingNumber}`;
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
          let reversed = data.tracking_history.reverse();
          visited_locations.push(
            new Date(reversed[a].status_date).toString() + ": " +
              this.getAddress(reversed[a].location) + "\n" +
              reversed[a].status
          );
        }
        this.setState({dataSource: this.state.dataSource.cloneWithRows(visited_locations)});

      });
  }

  getAddress(location) {
    let address_str = "";
    if (!location) {
      return "";
    }
    let keys = Object.keys(location);
    for (let index in keys) {
      address_str += location[keys[index]];
      if (keys[index] === "city") address_str += ",";
      if (keys[index] !== "country" && location[keys[index]] !== "") address_str += " ";
    }
    return address_str;
  }

  render() {
    let fromAddress = "", toAddress = "", status = "", status_details = "";
    let status_date_with_location = "", curr_location = "";
    if (this.state.details.tracking_status) {
      let det = this.state.details;
      fromAddress = this.getAddress(det.address_from);
      toAddress = this.getAddress(det.address_to);
      status = det.tracking_status.status;
      status_date_with_location = new Date(det.tracking_status.status_date).toString() + ": " +
        this.getAddress(det.tracking_status.location);
      status_details = det.tracking_status.status_details;
    }

    return (
      <View style={styles.view}>
        <TouchableHighlight style={{
            marginTop: 15
          }}
          onPress={this._handleBackPress}>
          <Text> {"<"} Home</Text>
        </TouchableHighlight>
        <Text style={styles.carrierText}>
          {carriers[this.state.carrier]}
        </Text>
        <Text style={styles.trackingNumberText}>
          Tracking No.:{" "}
          {this.state.trackingNumber}
        </Text>
        <Text style={styles.status}>
          {status}{"\n"}
        </Text>
        <Text style={styles.status_details}>
          {status_date_with_location}{"\n"}
          {"\n"}
          {status_details}{"\n"}
        </Text>
        <Text style={styles.addresses}>
          From: {fromAddress}{"\n"}
          To: {toAddress}{"\n"}
        </Text>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={{marginTop: 5}}>{rowData}</Text>}
          renderHeader={() => <Text style={{fontWeight: '700', fontSize: 16}}>Tracking History</Text>}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10
  },
  carrierText: {
    fontSize: 25,
    marginTop: 10,
    color: 'blue',
    textAlign: 'left',
  },
  trackingNumberText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    textAlign: 'left',
  },
  status: {
    fontSize: 20,
    marginTop: 5,
    color: 'green'
  },
  status_details: {
    fontSize: 15,
  },
  addresses: {
    fontSize: 15,
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
