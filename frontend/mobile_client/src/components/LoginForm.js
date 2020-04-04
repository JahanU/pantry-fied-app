import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, ScrollView, ActivityIndicator, AsyncStorage 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import gql from 'graphql-tag';
import { withNavigation } from 'react-navigation';
import { PantryfiedContext } from '../context/PantryfiedContext';

const skipLogin = false;

const loginRequest = gql`
  mutation($username: String!, $password: String!) {
    login(userKey: $username, password: $password) {
      ok
      user {
        id
        username
        email
        admin
      }
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.loginButtonPressed = this.loginButtonPressed.bind(this);
    this.displayLogin = this.displayLogin.bind(this);
    this.displayLoading = this.displayLoading.bind(this);
    this.registerButtonPressed = this.registerButtonPressed.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    this.state = {
      loading: false,
      loginFailed: false,
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    // check for token and if there is one then navigate to main
  }

  async loginButtonPressed() {
    this.setState({ loading: true });
    console.log(`user: ${this.state.username} pass: ${this.state.password}`);
    // check username and password here, if correct then set loading to false, and navigate
    // if incorrect then set loading to false and loginfailed to true

    if (skipLogin) {
      this.props.navigation.navigate('Main');
    } else {
      await this.context.apolloClient
        .mutate({
          mutation: loginRequest,
          variables: { username: this.state.username, password: this.state.password },
          fetchPolicy: 'no-cache'
        })
        .then(async ({ data }) => {
          console.log('login Data: ', data);
          if (data.login.ok) {
            await AsyncStorage.setItem('userTokens', JSON.stringify([data.login.token, data.login.refreshToken]));
            this.props.navigation.navigate('Main');
          } else {
            setTimeout(() => {
              this.setState({ loading: false, loginFailed: true, username: '', password: '' });
            }, 3000);
          }
        })
        .catch(error => console.log(error));
    }
  }

  registerButtonPressed() {
    this.props.navigation.navigate('RegisterPage');
  }

  resetPassword() {
    // Probs dont actually need to do this?
    console.log('reset password');
  }

  displayLogin() {
    if (!this.state.loading) {
      return (
        <ScrollView>
          <StatusBar barStyle="light-content" />
          <Icon name="ios-person" size={24} color="rgba(255, 255, 255, 0.3)" style={styles.inputIconPerson} />
          <Icon name="ios-lock" size={24} color="rgba(255, 255, 255, 0.3)" style={styles.inputIconLock} />
          <TextInput
            style={styles.input}
            placeholder="Enter: username / email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next" // changes keyboard button
            onSubmitEditing={() => this.passwordInput.focus()} // After pressing next, moves onto password container
            keyboardType="email-address" // Changes keyboard settings
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => this.setState({ username: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter: password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            ref={input => (this.passwordInput = input)}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
          <TouchableOpacity style={styles.buttonContainer} onPress={this.loginButtonPressed}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.resetPassword}>
            <Text style={styles.buttonText}>Forgot password?</Text>
          </TouchableOpacity>
          {this.displayFailedLogin()}
          <TouchableOpacity style={styles.signUpContainer} onPress={this.registerButtonPressed}>
            <Text style={{ fontSize: 16 }}> Don't Have an account yet? </Text>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    return <View />;
  }

  displayFailedLogin() {
    if (this.state.loginFailed) {
      return <Text style={{ color: 'red', fontSize: 18, alignSelf: 'center' }}>Failed to Log in</Text>;
    }
    return <View />;
  }

  displayLoading() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" color="#FFFFFF" />;
    }
    return <View />;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.displayLoading()}
        {this.displayLogin()}
      </View>
    );
  }
}
export default withNavigation(LoginForm);

LoginForm.contextType = PantryfiedContext;

/* How to install React Icons:
 https://stackoverflow.com/questions/42420931/how-to-use-react-native-vector-icons
 https://oblador.github.io/react-native-vector-icons/ -- List of icons to use
 https://alligator.io/react/use-native-icons/ - Tips
 */

const styles = StyleSheet.create({
  container: {
    padding: 20,
    bottom: 100,
    justifyContent: 'center' // https://reactnativecode.com/justifycontenton-style-explained/
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 15,
    color: '#fff',
    paddingLeft: 35,
    borderRadius: 10
  },
  buttonContainer: {
    backgroundColor: '#rgba(1,1,1,0.3)',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    borderColor: '#rgba(1,1,1,0.3)'
  },
  inputIconPerson: {
    top: 55,
    left: 8
  },
  inputIconLock: {
    top: 85,
    left: 8
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 150,
    fontSize: 220
  },
  signUpText: {
    color: '#fff',
    fontSize: 18
  }
});
