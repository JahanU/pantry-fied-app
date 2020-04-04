import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar, ActivityIndicator,
} from 'react-native';
import gql from 'graphql-tag';
import Icon from 'react-native-vector-icons/Ionicons';
import { PantryfiedContext } from '../context/PantryfiedContext';

const registerRequest = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      user {
        id
        username
        email
        admin
      }
      errors {
        path
        message
      }
    }
  }
`;


export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.displayFailedRegister = this.displayFailedRegister.bind(this);
    this.displayLoading = this.displayLoading.bind(this);
    this.displayRegister = this.displayRegister.bind(this);
    
    this.state ={
      username: '',
      email: '',
      password: '',
      registerFailed: false,
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }

  async registerUser() {
    this.setState({ loading: true });
    console.log(`register user: ${this.state.username} password: ${this.state.password} email: ${this.state.email}`);
    await this.context.apolloClient
      .mutate({
        mutation: registerRequest,
        variables: { username: this.state.username, email: this.state.email, password: this.state.password },
        fetchPolicy: 'no-cache',
      })
      .then(async ({ data }) => {
        console.log("login Data: ", data);
        if (data.register.ok) {
          this.props.navigation.goBack();
        } else {
          setTimeout(() => {
            this.setState({ loading: false, registerFailed: true, username: '', password: '', email: '' });
          }, 3000);
        }
        
      })
      .catch((error) => console.log(error));

  }

  displayFailedRegister() {
    if (this.state.registerFailed) {
      return <Text style={{ color: 'red', fontSize: 18, alignSelf: 'center' }}>Failed to Register</Text>;
    }
    return <View />;
  }

  displayLoading() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#000000" />;
    }
    return <View />;
  }

  displayRegister() {
    if (!this.state.loading) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Icon name="ios-mail" size={24} color="#28BAA5" style={styles.inputIconEmail} />
          <Icon name="ios-lock" size={24} color="#28BAA5" style={styles.inputIconLock} />
          <Icon name="ios-person" size={24} color="#28BAA5" style={styles.inputIconPerson} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            returnKeyType="next" // changes keyboard button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            keyboardType="email-address" // Changes keyboard settings
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            returnKeyType="next"
            ref={input => (this.passwordInput = input)}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            returnKeyType="go" // changes keyboard button
            // I think once they hit go, we can move them onto the next screen, thus removing the "done" button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            autoCorrect={false}
            onChangeText={text => this.setState({ username: text })}
          />
          {this.displayFailedRegister()}
          <TouchableOpacity style={styles.buttonContainer} onPress={this.registerUser}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={this.goBack}>
  
              Back to login screen
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <View />;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.displayLoading()}
        {this.displayRegister()}
      </View>
    );
  }
}

RegisterPage.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'flex-start',
    // bottom: 00,
  },
  input: {
    height: 40,
    marginBottom: 15,
    color: 'black',
    paddingLeft: 35,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    backgroundColor: '#rgba(40,186,163, 1)',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    borderColor: '#28BAA5',
  },
  inputIconEmail: {
    top: 81,
    left: 8,
  },
  inputIconLock: {
    top: 110,
    left: 8,
  },
  inputIconPerson: {
    top: 140,
    left: 8,
  },
});

//   render() {
//     return (
//       <View>
//         <Text>
//           Register page
//         </Text>
//         <Button onPress={this.goBack}>
//           Back to login screen
//         </Button>
//       </View>
//     );
//   }
// }
