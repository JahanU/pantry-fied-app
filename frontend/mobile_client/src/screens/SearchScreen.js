import React, { Component } from 'react';
import {
  Text, View, StyleSheet, FlatList, TouchableOpacity, Image, CheckBox 
} from 'react-native';
import gql from 'graphql-tag';
// import { SearchBar } from 'react-native-elements';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

/* const getRecipeQuery = gql`
    query($ingredients: [Int]!) {
        getRecipes(ingredients: $ingredients) {
            id
            name
            description
            imgUrl
            ingredients {
              id
              name
            }
        }
    }
`; */

const getRecipeQuery = gql`
  query GetRecipes($ingredientsRaw: [Int!]) {
    getRecipes(ingredientsRaw: $ingredientsRaw) {
      id
      name
      steps
      quantities {
        quantity
        unit
        ingredient {
          id
          name
        }
      }
      description
      rating
      imgURL
      tags
      preparationMinutes
      cookingMinutes
      servings
      matchScore
    }
  }
`;

const getIngredientsQuery = gql`
  query {
    getIngredients {
      id
      name
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.ingredientPressed = this.ingredientPressed.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.searchButtonPressed = this.searchButtonPressed.bind(this);
    this.shaveList = this.shaveList.bind(this);
    this.fetchIngredientList = this.fetchIngredientList.bind(this);
    this.checkResultsFavourites = this.checkResultsFavourites.bind(this);
    this.state = {
      ingredients: [],
      ingredientsArg: [],
      ingredientsToSearch: [],
      isChecked: false
    };
  }

  componentDidMount() {
    this.fetchIngredientList();
  }

  async fetchIngredientList() {
    await this.context.apolloClient
      .query({
        query: getIngredientsQuery,
        fetchPolicy: 'network-only'
      })
      .then(({ data }) => {
        const dataArr = data.getIngredients;
        dataArr.forEach(arrayItem => {
          arrayItem.selected = false;
          arrayItem.key = String(arrayItem.id);
          this.state.ingredients.push(arrayItem);
        });
      })
      .catch(error => console.log(error));
    const nowRefresh = this.state.refresh;
    this.setState({ refresh: !nowRefresh });
  }

  ingredientPressed(item) {
    this.state.ingredients.forEach(arrayItem => {
      if (arrayItem.key == item.key) {
        if (arrayItem.selected) {
          arrayItem.selected = false;
        } else {
          arrayItem.selected = true;
        }
        const nowRefresh = this.state.refresh;
        this.setState({ refresh: !nowRefresh });
      }
    });
  }

  renderSelected(item) {
    if (item.selected) {
      return <Image source={require('../assets/selectedItem.png')} style={{ flex: 1 }} />;
    }
    return <Image source={require('../assets/unselectedItem.png')} style={{ flex: 1 }} />;
  }

  renderItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.ingredientPressed(item)} style={{ flex: 4 }}>
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
        {this.renderSelected(item)}
      </View>
    );
  }

  async searchButtonPressed() {
    this.shaveList();
    // get the recipes from the backend using this.state.ingredientsToSearch
    const ingredientsRaw = this.state.ingredients.filter(ingr => ingr.selected).map(ingr => ingr.id);
    await this.context.apolloClient
      .query({
        query: getRecipeQuery,
        variables: { ingredientsRaw },
        fetchPolicy: 'network-only'
      })
      .then(({ data }) => {
        let dataArr = data.getRecipes;
        console.log('\nRecipe data:\n', dataArr);
        dataArr.forEach(arrayItem => {
          if (!arrayItem.key) {
            arrayItem.key = String(arrayItem.id);
            arrayItem.favourite = false;
            arrayItem.quantities.forEach(ingredientItem => {
              ingredientItem.key = String(ingredientItem.ingredient.id);
            });

            let stepsKey = 1;
            const newSteps = [];
            arrayItem.steps.forEach(item => {
              newSteps.push({ step: item, key: String(stepsKey) });
              stepsKey++;
            });
            arrayItem.steps = newSteps;
          }
        });
        // dataArr = this.removeAllergens(dataArr);
        dataArr = this.checkResultsFavourites(dataArr);
        this.context.setFoundRecipeList(dataArr);
        // console.log('data arr: ', dataArr);
      })
      .catch(error => console.log(error));

    this.props.navigation.navigate('SearchResultsScreen');
  }

  // probably needs optimising
  checkResultsFavourites(dataArr) {
    this.context.favourites.forEach(arrayItem => {
      dataArr.forEach(dataItem => {
        if (arrayItem.key == dataItem.key) {
          if (arrayItem.favourite) {
            dataItem.favourite = true;
          }
        }
      });
    });
    return dataArr;
  }

  removeAllergens(dataArr) {
    const newArr = [];
    // loop through all allergens
    // loop through dataArr
    // loop through ingredients in dataArr
    // if ingredients contains an allergen then dont add to array
    // otherwise push item onto new Arr
    return newArr;
  }

  shaveList() {
    // this.state.ingredientsArgs.splice(0, this.state.ingredientsArg.length);
    this.state.ingredients.forEach(arrayItem => {
      if (arrayItem.selected) {
        this.state.ingredientsArg.push(arrayItem.id);
        this.state.ingredientsToSearch.push(arrayItem);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <SearchBar placeholder="Type Here..." onChangeText={this.updateSearch} value={search} /> */}
        <Text style={styles.headerBar}> Search Screen </Text>
        <View style={{ flex: 16 }}>
          <FlatList data={this.state.ingredients} extraData={this.state.refresh} renderItem={({ item }) => this.renderItem(item)} />
        </View>
        <Button
          inheritStyle={styles.searchButtonStyle}
          inheritTextStyle={styles.searchButtonText}
          onPress={this.searchButtonPressed}
          definedFlex={1}
        >
          Search with selected ingredients
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    flex: 1
  },
  navButtonText: {
    fontSize: 18
  },
  item: {
    flex: 4,
    padding: 10,
    fontSize: 26
  },
  searchButtonStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#28BAA5'
  },
  searchButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
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
    backgroundColor: '#28BAA5'
  }
});

SearchScreen.contextType = PantryfiedContext;
