import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight, StyleSheet, ListView, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

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
      this.props.navigator.push({ name: 'Home' });
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
      return "Address Unavailable";
    }
    let keys = Object.keys(location);
    for (let index in keys) {
      address_str += location[keys[index]];
      if (keys[index] === "city" && location[keys[index]] !== "") address_str += ",";
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
        <View style={styles.header}>
          <View style={{ width: width * .9, paddingTop: 15}}>
            <TouchableHighlight style={{
                width: 50,
                height: 20
              }}
              onPress={this._handleBackPress}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}> {"<"} </Text>
            </TouchableHighlight>
          </View>
          <View style={{ width: width * .8, paddingBottom: 15 }}>
            <Text style={styles.carrierText}>
              {carriers[this.state.carrier]}
            </Text>
            <Text style={styles.trackingNumberText}>
              Tracking No.:{" "}
              {this.state.trackingNumber}
            </Text>
          </View>
        </View>

        <View style={{ width: width * .8, height: 50, paddingTop: 10 }}>
          <Text style={styles.status}>
            {status}{"\n"}
          </Text>
        </View>

        <View style={styles.header}>
          <View style={{ width: width * .8, paddingTop: 15, paddingBottom: 15 }}>
            <Text style={styles.status_details}>
              {status_date_with_location}{"\n"}
              {"\n"}
              {status_details}{"\n"}
            </Text>
            <Text style={styles.addresses}>
              From: {fromAddress}{"\n"}
              To: {toAddress}{"\n"}
            </Text>
          </View>
        </View>

          <ListView
            style={{ width: width * .8, paddingTop: 15 }}
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View style={{
                  borderColor: '#6d6e70',
                  borderBottomWidth: 1,
                  paddingTop: 5,
                  paddingBottom: 5}}>
                  <Text style={{
                      color: '#6d6e70'
                    }}>{rowData}
                  </Text>
                </View>}
            renderHeader={() => <Text style={{
              fontWeight: '700',
              fontSize: 16,
              alignItems: 'flex-start',
              paddingBottom: 10,
              color: '#b98d49'
            }}>Tracking History</Text>}
            enableEmptySections={true}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    width: width
  },
  header: {
    alignItems: 'center',
    width: width,
    backgroundColor: '#454647'
  },
  carrierText: {
    fontSize: 25,
    marginTop: 10,
    color: '#b98d49',
    textAlign: 'left',
  },
  trackingNumberText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'left',
  },
  status: {
    fontSize: 20,
    height: 50,
    color: '#b98d49',
    fontWeight: 'bold'
  },
  status_details: {
    fontSize: 13,
    color: 'white'
  },
  addresses: {
    fontSize: 13,
    color: 'white'
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
