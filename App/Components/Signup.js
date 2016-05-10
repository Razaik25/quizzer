'use strict';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';

import Dimensions from 'Dimensions';
import Animatable from 'react-native-animatable';

import Profile from './Profile';
import api from '../network/api';

const windowSize = Dimensions.get('window');
// invoking firebase
const Firebase = require('firebase');
// link to the database in firebase
const ref = new Firebase('https://quizzer-raz.firebaseio.com/')

export default class Signup extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      error: false,
    }
  }

  handleName(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }

  handleEmail(event){
    this.setState({
      email: event.nativeEvent.text
    });
  }

  handlePassword(event){
    this.setState({
      password: event.nativeEvent.text
    });
  }

  PushProfilePage(data){
    this.props.navigator.push({
      title: 'User Profile',
      component: Profile,
      passProps:{userstats: data,
                 login: false
      }
    });
  }

  apicall(){
    // send a request to api for creating a user and getting the stats back for the games a user played in each category
    var email = this.state.email;
    var username = this.state.username;
    api.addUser(email,username)
    .then((res) =>{
         console.log('in add user api',res);
         api.getUser(email)
           .then((data) => {
               console.log('in appi second call',data);
               this.PushProfilePage(data);
            })
       .catch((err) => {
         console.log('inside err', err);
         this.setState({
           isLoading: false,
           error: `There was an error: ${err}`
         });
       });
    })
    .done();

    this.setState({
      isLoading: true,
    });

  }

  handleSignup(){
    // adds user to firebase
    ref.createUser({
      email: this.state.email,
      password: this.state.password
    }, (error, userData) => {
      if(error) {
        console.log('Error creating user: ', error);
        alert(error);
      } else {
        console.log("Signup Success")
        this.apicall();
        }
      }
    )

  }

  render(){
    return(
      <View  style={styles.container}>
        {/* Background Image */}
        <Image style={styles.bg}
        source={{uri: 'http://www.mobileswall.com/wp-content/uploads/2015/11/901-House-On-The-Rock-Library-l.jpg'}}/>

        {/* Header Check Mark */}
        <View style={styles.header}>
          <Image style={styles.mark}
          source={{uri: 'https://cdn.elegantthemes.com/blog/wp-content/uploads/2015/12/quiz.png'}}/>
        </View>

        <View style={styles.inputs}>


          {/* name section*/}
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername}
            source={{uri: 'http://i40.tinypic.com/xf0zuq.jpg'}}/>
            <TextInput style={[styles.input, styles.whiteFont]}
            placeholder="Name"
            placeholderTextColor="#FFF"
            value={this.state.username}
            onChange={this.handleName.bind(this)}/>
          </View>

            {/* email section*/}
          <View style={styles.inputContainer}>
            <Image style={styles.inputUsername}
            source={{uri: 'http://i66.tinypic.com/2qltjx3.png'}}/>
            <TextInput style={[styles.input, styles.whiteFont]}
            placeholder="Email"
            placeholderTextColor="#FFF"
            value={this.state.email}
            onChange={this.handleEmail.bind(this)}/>
          </View>

          {/* password section*/}
          <View style={styles.inputContainer}>
            <Image style={styles.inputPassword}
            source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
            <TextInput style={[styles.input, styles.whiteFont]}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#FFF"
            value={this.state.password}
            onChange={this.handlePassword.bind(this)}/>
          </View>
        </View>

        {/* Sign up*/}
        <View>
            <TouchableHighlight
            style={styles.signin}
            onPress={this.handleSignup.bind(this)}
            underlayColor="#FFC300">
              <Text style={styles.whiteFont}> Sign Up </Text>
            </TouchableHighlight>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5,
      backgroundColor: 'transparent'
    },
    mark: {
      width: 120,
      height: 120,
      borderRadius: 50
    },
    signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    signup: {
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#FF3366',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .15,

    },
    inputs: {
      marginTop: 10,
      marginBottom: 10,
      flex: .25
    },
    inputPassword: {
      marginLeft: 15,
      width: 20,
      height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20,
    },
    inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent'
    },
    input: {
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 20,
      fontSize: 22,
      fontWeight: 'bold'
    },
    whiteFont: {
      color: '#FFF',
      fontWeight: '900'
    },
    title: {
      marginBottom: 10,
      fontSize: 30,
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold'
    },
});
