import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { withNavigation } from 'react-navigation';

// eslint-disable-next-line react/prefer-stateless-function
class MainSettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.renderButton = this.renderButton.bind(this);
    this.state = {
      data: [
        { key: 'Personal details', nav: 'PersonalDetailsScreen' },
        { key: 'Account details', nav: 'AccountDetailsScreen' },
        { key: 'Unit system', nav: 'UnitsScreen' },
        { key: 'Allergies', nav: 'PreferencesScreen' },
        { key: 'Logout', nav: 'LogoutScreen' },
      ],
      loading: false,
      refreshing: false,
    };
  }

  navigateToScreen(item) {
    if (item.nav == 'LogoutScreen') {
      // logout user and switch back to login page
      console.log('logout');
      // remove tokens and data etc.
      this.props.navigation.navigate("Login");
    } else {
      this.props.navigation.navigate(item.nav);
    }
  }

  renderButton(item) {
    console.log('renderButton: ', item);
    return (
      <View>
        <TouchableOpacity onPress={() => this.navigateToScreen(item)}>
          <Text style={styles.text}>{item.key}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList data={this.state.data} renderItem={({ item }) => this.renderButton(item)} />
      </View>
    );
  }
}

export default withNavigation(MainSettingsScreen);

MainSettingsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  text: {
    textAlign: 'center',
    width: 360,
    height: 40,
    marginTop: 20,
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
