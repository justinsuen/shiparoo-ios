import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

class SinglePackage extends Component {
  constructor(props) {
    super(props);
    this._handleBackPress = this._handleBackPress.bind(this);
    this.state = { region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  _handleBackPress() {
      this.props.navigator.pop();
  }

  onRegionChange(region) {
    this.setState({ region });
  }


  render() {
    return(
      <View style={ styles.container }>
        <TouchableHighlight style={{
            padding: 15
          }}
          onPress={this._handleBackPress}>
          <Text>My Package</Text>
        </TouchableHighlight>
        <MapView style= { styles.map }
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />

      </View>
    );
  }
}

export default SinglePackage;
