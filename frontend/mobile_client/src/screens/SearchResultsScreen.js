import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { FavButton } from '../components/common/FavButton';
import { FavButtonFill } from '../components/common/FavButtonFill';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchResultsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.favouriteButtonPressed = this.favouriteButtonPressed.bind(this);
    this.recipePressed = this.recipePressed.bind(this);
    this.renderFavourite = this.renderFavourite.bind(this);
    this.state = {
      refresh: true,
    };
  }

  // sync this.state.favourites with favourites screen using context and functions
  favouriteButtonPressed(item) {
    this.context.updateFavouriteArray(item);
    this.context.updateResultsFavourites();
    this.setState({ refresh: !this.state.refresh });
  }

  recipePressed(recipe) {
    this.context.setRenderRecipe(recipe);
    this.props.navigation.navigate('RecipeScreen');
  }


  renderFavourite(item) {
    if (item.favourite) {
      return <FavButtonFill onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />;
    }
    return <FavButton onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />;
  }

  renderItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.recipePressed({ recipe: item })} style={{ flex: 4 }}>
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
        {this.renderFavourite(item)}
      </View>
    );
  }
  
  render() {
    return (
      <View>
        <Text style={{ flex: 2, fontSize: 20 }}> Search Results Screen </Text>
        <FlatList
            data={this.context.foundRecipes}
            extraData={this.state.refresh}
            renderItem={({item}) => this.renderItem(item)}
        />
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

SearchResultsScreen.contextType = PantryfiedContext;
