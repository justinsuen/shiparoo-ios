import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import AllPackages from './react-assets/components/all_packages';
import VerifyPIN from './react-assets/components/verify_pin';
import Home from './react-assets/components/home';
import ShowPackage from './react-assets/components/show_package';

class Shiparoo extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  _navigate(){
    this.props.navigator.push({
      name: 'All Packages', // Matches route.name
    });
  }

  renderScene(route, navigator) {
   if(route.name === 'Home') {
     return <Home navigator={navigator} />;
   } else if (route.name === 'All Packages') {
     return <AllPackages navigator={navigator} />;
   } else if (route.name === 'Verify PIN') {
     return <VerifyPIN navigator={navigator} />;
   } else if (route.name === 'Show Package') {
     return <ShowPackage navigator={navigator} {...route.passProps} />;
   }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Home' }}
        renderScene={ this.renderScene }
      />
    );
  }
}

AppRegistry.registerComponent('Shiparoo', () => Shiparoo);
