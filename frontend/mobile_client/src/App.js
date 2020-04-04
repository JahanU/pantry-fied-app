/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image, AsyncStorage 
} from 'react-native';
import ApolloClient from 'apollo-boost';
import { PantryfiedContext } from './context/PantryfiedContext';
import AppNavigation from './navigation/AppNavigation';

const client = new ApolloClient({
  uri: 'http://vaeb.io:8080/graphql'
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkIfInList = this.checkIfInList.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.removeItemFromArray = this.removeItemFromArray.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.storeFavourites = this.storeFavourites.bind(this);
    this.getUnits = this.getUnits.bind(this);
    this.storeUnits = this.storeUnits.bind(this);
    this.storeAllergens = this.storeAllergens.bind(this);
    this.retrieveAllergens = this.retrieveAllergens.bind(this);
    

    // actual code
    this.setRecipeToRender = recipe => {
      console.log('Set render recipe');
      this.setState({ renderRecipe: recipe.recipe });
    };

    this.setRecipeList = recipeList => {
      this.setState({ foundRecipes: recipeList });
    };

    this.updateResultsFavourites = () => {
      console.log('updateResultsFav');
      this.state.favourites.forEach(arrayItem => {
        this.state.foundRecipes.forEach(dataItem => {
          if (arrayItem.key == dataItem.key) {
            if (arrayItem.favourite) {
              dataItem.favourite = true;
            } else {
              dataItem.favourite = false;
            }
          }
        });
      });
    };

    this.updateFavouriteArray = item => {
      // also update foundRecipes with the check
      this.setState({ refreshFavourites: !this.state.refreshFavourites });
      const newFav = [];
      if (!this.checkIfInList(item)) {
        console.log('item not in list');
        item.favourite = true;
        this.addFavourite(item);
      } else {
        console.log('item already in list');
        this.state.favourites.forEach(arrayItem => {
          if (arrayItem.key == item.key) {
            if (arrayItem.favourite) {
              arrayItem.favourite = false;
              this.removeFavourite(item);
            } else {
              arrayItem.favourite = true;
              this.addFavourite(item);
            }
          }
          newFav.push(arrayItem);
        });
        this.setState({ favourites: newFav });
      }
      this.updateResultsFavourites();
    };

    this.setUnits = unit => {
      this.setState({ units: unit });
      this.storeUnits(unit);
    };

    this.updateAllergens = item => {
      const newAllergens = [];
      this.state.allergens.forEach(arrayItem => {
        if (arrayItem.key == item.key) {
          if (arrayItem.selected) {
            arrayItem.selected = false;
          } else {
            arrayItem.selected = true;
          }
        }
        newAllergens.push(arrayItem);
      });
      this.storeAllergens();
      this.setState({ allergens: newAllergens });
    };

    this.state = {
      userData: {
        username: undefined,
        password: undefined,
        loginToken: undefined
      },
      units: '',
      setFoundRecipeList: this.setRecipeList,
      foundRecipes: [],
      renderRecipe: {},
      setRenderRecipe: this.setRecipeToRender,
      updateFavouriteArray: this.updateFavouriteArray,
      updateResultsFavourites: this.updateResultsFavourites,
      setUnits: this.setUnits,
      apolloClient: client,
      favourites: [],
      updateAllergens: this.updateAllergens,
      refreshFavourites: false,
      allergens: [
        { key: 'Wheat', id: 'unknown', selected: false },
        { key: 'Eggs', id: 'unknown', selected: false },
        { key: 'Milk', id: 'unknown', selected: false },
        { key: 'Fish', id: 'unknown', selected: false },
        { key: 'Shellfish', id: 'unknown', selected: false },
        { key: 'Tree nuts', id: 'unknown', selected: false },
        { key: 'Peanuts', id: 'unknown', selected: false },
        { key: 'Soybeans', id: 'unknown', selected: false }
      ]
    };
  }

  componentDidMount() {
    this.getFavourites();
    this.retrieveAllergens();
    this.getUnits();
  }

  async retrieveAllergens() {
    let retrievedAllergens = '';
    try {
      retrievedAllergens = (await AsyncStorage.getItem('userAllergens')) || this.state.allergens;
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ allergens: JSON.parse(retrievedAllergens) });
  }

  async getUnits() {
    let retreivedUnit = '';
    try {
      retreivedUnit = (await AsyncStorage.getItem('userUnits')) || 'metric';
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ units: JSON.parse(retreivedUnit).unit });
  }

  async storeUnits(unit) {
    try {
      await AsyncStorage.setItem('userUnits', JSON.stringify(unit));
    } catch (error) {
      console.log(error.message);
    }
  }

  async getFavourites() {
    let favList = '';
    try {
      favList = (await AsyncStorage.getItem('favouritesList')) || 'none';
      console.log('init favList: ', favList);
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ favourites: JSON.parse(favList) });
  }

  async addFavourite(item) {
    if (this.checkIfInList(item)) {
      console.log('item already in list so dont push');
    } else {
      console.log('item not in list');
      this.state.favourites.push(item);
    }
    try {
      let newFavArr = [];
      newFavArr = this.storeFavourites();
      await AsyncStorage.setItem('favouritesList', JSON.stringify(newFavArr));
      console.log('favList add: ', JSON.stringify(newFavArr));
    } catch (error) {
      console.log(error.message);
    }
  }

  async storeAllergens() {
    try {
      await AsyncStorage.setItem('userAllergens', JSON.stringify(this.state.allergens));
    } catch (error) {
      console.log(error.message);
    }
  }

  storeFavourites() {
    const newFavArr = [];
    this.state.favourites.forEach(arrayItem => {
      if (arrayItem.favourite) {
        newFavArr.push(arrayItem);
      }
    });
    return newFavArr;
  }

  checkIfInList(item) {
    console.log('checkItem');
    let itemFound = false;
    this.state.favourites.forEach(arrayItem => {
      if (arrayItem.key == item.key) {
        console.log('Item found');
        itemFound = true;
      }
    });
    return itemFound;
  }

  async removeFavourite(item) {
    try {
      const favListArr = this.removeItemFromArray(item);
      console.log(`newFavArr: ${JSON.stringify(favListArr)}`);
      await AsyncStorage.setItem('favouritesList', JSON.stringify(favListArr));
      console.log('favList remove: ', favListArr);
    } catch (error) {
      console.log(error.message);
    }
  }

  removeItemFromArray(item) {
    const newFavArr = [];
    this.state.favourites.forEach(arrayItem => {
      if (arrayItem.key != item.key) {
        if (arrayItem.favourite) {
          console.log('item: ', arrayItem, ' added to favArr');
          newFavArr.push(arrayItem);
        }
      }
    });
    return newFavArr;
  }

  render() {
    return (
      <PantryfiedContext.Provider
        value={{
          user: this.state.userData,
          setRenderRecipe: this.state.setRenderRecipe,
          renderRecipe: this.state.renderRecipe,
          foundRecipes: this.state.foundRecipes,
          apolloClient: this.state.apolloClient,
          setFoundRecipeList: this.state.setFoundRecipeList,
          favourites: this.state.favourites,
          updateFavouriteArray: this.state.updateFavouriteArray,
          updateResultsFavourites: this.state.updateResultsFavourites,
          units: this.state.units,
          setUnits: this.state.setUnits,
          allergens: this.state.allergens,
          updateAllergens: this.state.updateAllergens,
          refreshFavourites: this.state.refreshFavourites,
        }}
      >
        <AppNavigation screenProps={{ ...this.props }} />
      </PantryfiedContext.Provider>
    );
  }
}

App.contextType = PantryfiedContext;
