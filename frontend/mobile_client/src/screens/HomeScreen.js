import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class HomeScreen extends Component {
  render() {
    let { user } = this.context;
    return (
      <View>
        <Text> As an example we can now access the user data here by doing </Text>
        <Text>
          {user}
        </Text>
      </View>
    );
  }
}

HomeScreen.contextType = PantryfiedContext;
