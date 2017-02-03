import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import AllPackages from './react-assets/components/all_packages';
import Home from './react-assets/components/home';
import SinglePackage from './react-assets/components/single_package';

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
   } else if (route.name === 'Single Package') {
     return <SinglePackage navigator={navigator} />;
   }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Single Package' }}
        renderScene={ this.renderScene }
      />
    );
  }
}

AppRegistry.registerComponent('Shiparoo', () => Shiparoo);
