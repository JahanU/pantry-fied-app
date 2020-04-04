import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Image, FlatList, ScrollView 
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

const parseRecipeData = (possibleData, alt, extra) => (possibleData != null ? `${possibleData}${extra != null ? extra : ''}` : alt); // Can't just use || below in case possibleData is 0

// eslint-disable-next-line react/prefer-stateless-function
export default class InstructionsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderIngredient = this.renderIngredient.bind(this);
  }

  componentDidMount() {
    console.log('Mounting instructions page');
  }

  renderIngredient(item) {
    if (item.quantity == 0) {
      return (
        <Text style={styles.directionText}>
          {item.ingredient.name}
        </Text>
      );
    }
    if (!('unit' in item)) {
      return (
        <Text style={styles.directionText}>
          {item.quantity} {item.ingredient.name}
        </Text>
      );
    }
    return (
      <Text style={styles.directionText}>
        {item.quantity} {item.unit} {item.ingredient.name}
      </Text>
    );
  }
  

  // make lists into ListItem and add key fields in App.js when setting renderRecipe
  render() {
    console.log('Rendering instruction data');
    return (
      <View style={{ flex: 1 }}>
        <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>
          {this.context.renderRecipe.name}
        </Text>
        <ScrollView style={{ flex: 1, width: '95%', marginLeft: `${(100 - 95) / 2}%` }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <Image
              source={{
                uri: parseRecipeData(this.context.renderRecipe.imgUrl, 'http://getdrawings.com/free-icon/free-question-mark-icon-67.png')
              }}
              style={{ width: 200, height: 200, marginTop: 16, marginBottom: 16 }}
            />
          </View>
          <Text style={styles.directionHeading}>Ingredients</Text>
          <FlatList
            data={this.context.renderRecipe.quantities}
            renderItem={({ item }) => this.renderIngredient(item)}
          />
          <Text style={styles.directionHeading}>Directions</Text>
          <FlatList
            data={this.context.renderRecipe.steps}
            renderItem={({ item }) => <Text style={styles.directionText}>{item.step}</Text>}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nameText: {
    // make the title central at the top with a black background
    fontSize: 25,
    color: '#FFFFFF',
    backgroundColor: '#28BAA5',
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  directionHeading: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  directionText: {
    fontSize: 15
  }
});

InstructionsScreen.contextType = PantryfiedContext;
