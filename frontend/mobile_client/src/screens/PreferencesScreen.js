import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class PreferencesScreen extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.allergenPressed = this.allergenPressed.bind(this);

    // obtain stored data
    this.state = {
      refresh: false,
    };
  }

  allergenPressed(item) {
    this.context.updateAllergens(item);
    this.setState({ refresh: !this.state.refresh });
  }

  renderSelected(item) {
    if (item.selected) {
      return <Image source={require('../assets/selectedItem.png')} style={{ flex: 1 }} />;
    }
    return <Image source={require('../assets/unselectedItem.png')} style={{ flex: 1 }} />;
  }

  renderButton(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.allergenPressed(item)} style={{ flex: 4 }}>
          <Text style={styles.allergenText}>{item.key}</Text>
        </TouchableOpacity>
        {this.renderSelected(item)}
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList data={this.context.allergens} extraData={this.state.refresh} renderItem={({item}) => this.renderButton(item)} />
      </View>
    );
  }
}

PreferencesScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  cell: {
    padding: 10,
    fontSize: 18,
    height: 44,
    margin: 30,
    justifyContent: 'center', // https://reactnativecode.com/justifycontenton-style-explained/
  },
  allergenText: {
    flex: 4,
    padding: 10,
    fontSize: 30,
  },
});
