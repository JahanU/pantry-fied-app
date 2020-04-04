import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Dialog from 'react-native-dialog';
import { PantryfiedContext } from '../context/PantryfiedContext';

export default class PersonalDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    // obtain stored data
    this.state = {
      details: {
        height: '',
        weight: '',
        gender: '',
        dateOfBirth: ''
      },

      flatList: [
        { key: 'Date of birth' },
        { key: 'Gender' },
        { key: 'height' },
        { key: 'Weight' }
      ],

      dialogVisibleArray: [false, false, false, false],
      index: 0
    };
  }

  showDialog(i) {
    const newArray = [this.dialogVisibleArray];
    newArray[i] = true;
    this.setState({ dialogVisibleArray: newArray });
  }

  handleCancel(i) {
    const newArray = [this.dialogVisibleArray];
    newArray[i] = false;
    this.setState({ dialogVisibleArray: newArray });
  }

  handleUpdate(i) {
    // TODO
    console.log(i);
  }

  // eslint-disable-next-line class-methods-use-this
  alertBox(item) {
    for (let i = 0; i < this.state.flatList.length; i++) {
      if (item.key == this.state.flatList[i].key) {
        this.showDialog(i);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderButton(item) {
    return (
      <View>
        <TouchableOpacity onPress={() => this.alertBox(item)}>
          <Text style={styles.text}>{item.key}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    let title = 'Enter ';
    for (let i = 0; i < this.state.dialogVisibleArray.length; i++) {
      if (this.state.dialogVisibleArray[i] == true) {
        title += this.state.flatList[i].key;
        this.state.index = i;
      }
    }
    return (
      <View>
        <Dialog.Container
          visible={this.state.dialogVisibleArray.includes(true)}
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>
            {' '}
            Do you want to update: {
              this.state.flatList[this.state.index].key
            }?{' '}
          </Dialog.Description>
          <Dialog.Input />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Update" onPress={this.handleUpdate} />
        </Dialog.Container>
        <Text style={styles.headerBar}> Personal details </Text>
        <FlatList
          data={this.state.flatList}
          renderItem={({ item }) => this.renderButton(item)}
        />
      </View>
    );
  }
}

PersonalDetailsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2
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
  },
  cell: {
    padding: 10,
    fontSize: 18,
    height: 44,
    margin: 30,
    justifyContent: 'center' // https://reactnativecode.com/justifycontenton-style-explained/
  },
  text: {
    textAlign: 'left',
    paddingLeft: 5,
    marginTop: 20,
    width: 360,
    height: 40,
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  }
});
