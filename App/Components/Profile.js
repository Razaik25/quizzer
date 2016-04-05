// make api calls here to get the user progress

'use strict';
var React = require('react-native');
var Animatable = require('react-native-animatable');


const {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
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
    height: 60,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#5cb860',
    fontSize: 16,
    fontFamily: 'Helvetica',
  }
});

class Profile extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <Text style ={styles.text}>In Profile</Text>

      </View>
    )
  }
}
module.exports = Profile;
