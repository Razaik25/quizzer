
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

class Result extends React.Component{


  startAgain(){
    // getting the category route
    var startroute = this.props.startAgainRoute;
    // passing the category route to navigator
    this.props.navigator.popToRoute(startroute);
  }

  differentPlayer(){
     // going back to the top most route
     this.props.navigator.popToTop();

  }

  render(){
    return(
      <View style={styles.container}>
       <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate" style={styles.text}>
         {this.props.username} you scored {this.props.score} out of 7
       </Animatable.Text>
       <Animatable.View style={styles.button} animation="bounceInLeft" easing="ease-in">
         <TouchableHighlight style={styles.button} onPress={this.startAgain.bind(this)} underlayColor="#FFC300">
           <Text  style={styles.buttonText}>Play Again </Text>
         </TouchableHighlight>
      </Animatable.View>
      <Animatable.View style={styles.button} animation="bounceInRight" easing="ease-in">
        <TouchableHighlight style={styles.button} onPress={this.differentPlayer.bind(this)} underlayColor="#FFC300">
          <Animatable.Text style={styles.buttonText}>Different Player?</Animatable.Text>
        </TouchableHighlight>
      </Animatable.View>
      </View>
    )
  }
}
module.exports = Result;
