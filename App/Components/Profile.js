// make api calls here to get the user progress

'use strict';
var React = require('react-native');
var Category = require('./Category');
var Animatable = require('react-native-animatable');
var _ = require('underscore');



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
    flex: 0.9,
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

  constructor(props){
    super(props);
    this.state = {
      error: false
    }
  }

  renderStats(){

    var currentobj = this.props.userstats[0];
    var stats;
    var that = this;
    stats =  Object.keys(currentobj).map(function(key) {
      if(key ==='username'){
        // return <Text style={styles.title}>{key} {currentobj[key]}</Text>
        return <Text key={key} style={styles.title}>Welcome {currentobj[key]}</Text>
      }

      if(currentobj[key] !== null && key !== 'id' && key !== 'email'){
        return <Text key ={key} style={styles.title}>Score {key}:{currentobj[key]}</Text>

      }
    })
    return stats;
  }

  PushCategoryPage(){

    this.props.navigator.push({
      title: 'Choose Category',
      component: Category,
      passProps:{ username: this.props.userstats[0].username,
                  email: this.props.userstats[0].email
                }
    });
  }


  handleSubmit(){
    // direct to the Category page
    this.PushCategoryPage();
  }

  render(){
    return(
      <View style={styles.container}>
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
