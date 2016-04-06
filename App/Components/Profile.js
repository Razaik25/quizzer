// make api calls here to get the user progress

'use strict';
var React = require('react-native');
var Animatable = require('react-native-animatable');
var _ = require('underscore');
var Animatable = require('react-native-animatable');


const {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5cb860',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

  },
  text: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 50,
    fontFamily: 'Helvetica',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#5cb860',
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
  title: {
    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  }
});

class Profile extends React.Component{

  renderStats(){
    var currentobj = this.props.userstats[0];
    var stats;
    stats =  Object.keys(currentobj).map(function(key) {
      if(key ==='username'){
        // return <Text style={styles.title}>{key} {currentobj[key]}</Text>
        return <Text style={styles.title}>Welcome {currentobj[key]}</Text>
      }

      if(currentobj[key] !== null && key !== 'id' && key !== 'email'){
        return <Text style={styles.title}>Your score in {key}:{currentobj[key]}</Text>

      }

    })

    return stats;
  }

  handleSubmit(){
    
  }

  render(){
    return(

        <View style={styles.container}>
          <Text style ={styles.title}>In Profile</Text>
          {this.renderStats()}
            <TouchableHighlight
            style={styles.button}
            onPress= {this.handleSubmit.bind(this)}
            underlayColor="#FFC300">
              <Text style={styles.buttonText}> Start Game </Text>
            </TouchableHighlight>
        </View>

    )
  }
}
module.exports = Profile;
