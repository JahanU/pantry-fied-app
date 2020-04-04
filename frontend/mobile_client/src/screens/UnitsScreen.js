import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity 
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

export default class UnitsScreen extends Component {
  constructor(props) {
    super(props);
    this.checkInitialState = this.checkInitialState.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    // obtain stored data
    this.state = {
      details: {},
      checked: false,
      colorMetric: '#rgba(40,186,163, 1)',
      colorImperial: 'grey'
    };
  }

  componentDidMount() {
    if (!this.state.checked) {
      this.checkInitialState();
    }
  }

  checkInitialState() {
    if (this.context.units == 'imperial') {
      this.setState({ checked: true });
      this.setState({ colorMetric: 'grey' });
      this.setState({ colorImperial: '#rgba(40,186,163, 1)' });
    }
  }

  buttonPressed(unit) {
    console.log('unit: ', unit);
    this.context.setUnits({ unit });
    if (unit == 'imperial') {
      console.log('Set imperial colors');
      this.setState({ colorImperial: '#rgba(40,186,163, 1)' });
      this.setState({ colorMetric: 'grey' });
    } else {
      console.log('Set metric colors');
      this.setState({ colorImperial: 'grey' });
      this.setState({ colorMetric: '#rgba(40,186,163, 1)' });
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.headerBar}> Unit system </Text>

        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: this.state.colorImperial }]}
          onPress={() => this.buttonPressed('imperial')}
        >
          <Text style={styles.buttonText}>Imperial system - Ounces</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContainer, { backgroundColor: this.state.colorMetric }]}
          onPress={() => this.buttonPressed('metric')}
        >
          <Text style={styles.buttonText}>Metric system - Grams</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

UnitsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    margin: 10,
    top: 100,
    marginTop: 90,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    borderColor: '#28BAA5'
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
