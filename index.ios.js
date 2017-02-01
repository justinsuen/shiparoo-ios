import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Navigator } from 'react-native';

import AllPackages from './react-assets/components/all_packages';

class Shiparoo extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <Navigator
          initialRoute={{ title: 'Home', index: 0 }}
          renderScene={(route, navigator) => {
            return <AllPackages
              title={`Scene ${route.index + 1}`}
              onForward={() => {
                const nextIndex = route.index + 1;
                navigator.push({ index: nextIndex });
              }}

              onBack={() => {
                if (route.index > 0) navigator.pop();
              }}
            />;
          }}
      />
    );
  }
}

AppRegistry.registerComponent('Shiparoo', () => Shiparoo);

// <View style={{
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center'
//   }}>
//   <Text style={{
//       marginBottom: 20,
//       fontSize: 30
//     }}>
//     Welcome to Shiparoo!
//   </Text>
//   <View style={{
//       width: 200,
//       height: 200
//     }}>
//     <TextInput
//       style={{height: 40}}
//       placeholder="Enter Shipment Info"
//       onChangeText={(text) => this.setState({text})}
//       />
//     <Text style={{padding: 10, fontSize: 42}}>
//       {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
//     </Text>
//   </View>
//   <Navigator
//     initialRoute={{ title: 'Home', index: 0 }}
//     renderScene={(route, navigator) => {
//       return <AllPackages
//         title={`Scene ${route.index + 1}`}
//         onForward={() => {
//           const nextIndex = route.index + 1;
//           navigator.push({ index: nextIndex });
//         }}
//
//         onBack={() => {
//           if (route.index > 0) navigator.pop();
//         }}
//         />
//     }}
//   />
// </View>
