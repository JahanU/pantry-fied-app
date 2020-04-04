import React, { Component } from 'react';
import {
  Text, View, AsyncStorage, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { FavButton } from '../components/common/FavButton';
import { FavButtonFill } from '../components/common/FavButtonFill';

export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.favouriteButtonPressed = this.favouriteButtonPressed.bind(this);
    this.resetAsyncStorage = this.resetAsyncStorage.bind(this);
    this.state = {
      refresh: true,
    };
  }

  // componentDidMount() {
  //   this.resetAsyncStorage();
  // }

  // testing
  async resetAsyncStorage() {
    console.log('reset');
    // await AsyncStorage.setItem('favouritesList', JSON.stringify(this.context.favourites));
    await AsyncStorage.setItem('favouritesList', '');
  }

  renderFavButton(item) {
    if (item.favourite) {
      return <FavButtonFill onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />;
    }
    return <FavButton onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />;
  }

  favouriteButtonPressed(item) {
    this.context.updateFavouriteArray(item);
    this.setState({ refresh: !this.state.refresh });
  }

  recipePressed(recipe) {
    this.context.setRenderRecipe(recipe);
    this.props.navigation.navigate('RecipeScreen');
  }

  renderItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.recipePressed({ recipe: item })} style={{ flex: 4 }}>
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
        {this.renderFavButton(item)}
      </View>
    );
  }

  // will only render the favourites that were present when app was loaded
  // make function to update and rerender (may just have to update state object)
  render() {
    return (
      <View>
        <Text style={styles.headerBar}> Favourites </Text>
        <FlatList data={this.context.favourites} extraData={[this.state.refresh, this.context.refreshFavourites]} renderItem={({ item }) => this.renderItem(item)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    flex: 1,
  },
  navButtonText: {
    fontSize: 18,
  },
  item: {
    flex: 4,
    padding: 10,
    fontSize: 18,
  },
  headerBar: {
    textAlign: 'center',
    width: '100%',
    height: 60,
    paddingTop: 10,
    fontSize: 28,
    borderBottomWidth: 1,
    color: '#fff',
    borderBottomColor: 'grey',
    backgroundColor: '#28BAA5',
  },
});

FavouritesScreen.contextType = PantryfiedContext;
