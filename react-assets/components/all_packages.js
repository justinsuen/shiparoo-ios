import React, { Component, PropTypes } from 'react';
import { View, Text, NavigatorIOS, TouchableHighlight } from 'react-native';

class AllPackages extends Component {
  constructor(props) {
    super(props);
    this._handleBackPress = this._handleBackPress.bind(this);
  }

  _handleBackPress() {
      this.props.navigator.pop();
  }

  render() {
    return(
      <View>
        <Text>{ this.props.name }</Text>
        <TouchableHighlight style={{
            padding: 15
          }}
          onPress={this._handleBackPress}>
          <Text>Home</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AllPackages;
