
'use strict';
var React = require('react-native');
var Category = require('./Category');
var Animatable = require('react-native-animatable');

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

var Video = require('react-native-video').default;
var Separator = require('./Separator');
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
    marginTop: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 25,
    marginTop: 10,
    fontFamily: 'Futura',

  },

  button: {
    backgroundColor: '#FF3366',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '900'
  },

  title: {

    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Futura',
  },

  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    // resizeMode:  'stretch'
    height: (window.height)*8
  },

  avatarimage: {
   height: 125,
   width: 125,
   borderRadius: 65,
   marginTop: 45,
   alignSelf: 'center'
 },

 gamehistoryImg: {
   height: window.height/8.335,
   borderRadius: (window.height/8.3350)/2,
   marginRight: 2,
   width: window.height/8.335,

 },

 gamehistorytext: {
   alignItems: 'center',
   alignSelf: 'center',
   color: 'white',
   marginTop: -25,
   fontWeight: '600',
   fontSize: 14,
   flex: 1,
   textAlign: 'center'
 },

 gamehistory: {
   flex: 1,
   flexDirection: 'row',
   alignSelf: 'stretch',
   justifyContent: 'center',
   marginLeft: 38,
   marginBottom: 20

 },

 welcome: {
   justifyContent: 'center',
   alignItems: 'center',
 }


});

class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      error: false
    }
  }

  renderRandomAvatar(){

    // random number between 1 and 4
    var number =  Math.floor(Math.random() * 4) + 1;
    if( number === 1){
      return (
        <Animatable.Image animation="zoomIn" easing="ease-in" style={styles.avatarimage} source={require('../Media/avatar1.jpg')}/>
      )
    } else if( number === 2) {
      return (
        <Animatable.Image animation="zoomIn" easing="ease-in" style={styles.avatarimage} source={require('../Media/avatar2.jpg')}/>
      )
    } else if( number === 3) {

      return (
        <Animatable.Image animation="zoomIn" easing="ease-in" style={styles.avatarimage} source={require('../Media/avatar3.jpg')}/>
      )
    } else if( number === 4){
      return (
        <Animatable.Image animation="zoomIn" easing="ease-in" style={styles.avatarimage} source={require('../Media/avatar3.jpg')}/>
      )
    }

  }

  renderStats(){

    var currentobj = this.props.userstats[0];
    var stats;
    var that = this;
    var test ='test'
    stats =  Object.keys(currentobj).map(function(key,index) {
      if(key ==='username' && that.props.login){
        return (
          <View style={styles.welcome} key={index} >
            <Animatable.Text animation="zoomIn" easing="ease-in" key={key} style={styles.text}> Welcome {currentobj[key]} {"\n"}{"\n"} Game History  {"\n"}</Animatable.Text>
          </View>
        )
      } else if(key ==='username') {
        return (
          <View style={styles.welcome} key={index} >
            <Animatable.Text animation="zoomIn" easing="ease-in" key={key} style={styles.text}> Welcome {currentobj[key]} {"\n"}{"\n"} Start Playing!!  {"\n"}</Animatable.Text>
          </View>
        )

      }
      if(currentobj[key] !== null && key !== 'id' && key !== 'email'){
        switch(key) {
          case 'canada':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image  style={styles.gamehistoryImg} source={require('../Media/canadaav.jpg')}/>
              <Text  key ={key} style={styles.gamehistorytext}>{"\n"} Canada: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'celebrities':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/celebsav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Celebrities: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'coding':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/codingav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Coding: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'friendstvshow':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/freindsav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Friends: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'generalknowledge':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/gkav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} General Knowledge: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'harrypotter':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/hpav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Harry Potter: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'math':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in"style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/mathav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Math: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'random':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image animation="flipInY" style={styles.gamehistoryImg} source={require('../Media/randomav.jpg')}/>
              <Text animation="flipInY" key ={key} style={styles.gamehistorytext}>{"\n"} Random: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;

          case 'superheroes':
          return(
            <Animatable.View animation="zoomIn" easing="ease-in" style={styles.gamehistory}key ={index}>
              <Image style={styles.gamehistoryImg} source={require('../Media/superav.jpg')}/>
              <Text key ={key} style={styles.gamehistorytext}>{"\n"} Super Heros: Recent Score {currentobj[key]}</Text>
            </Animatable.View>
          )
          break;
          
        }
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
      <ScrollView>
      <View style={styles.container}>
        <Image style={styles.bg} source={require('../Media/bg-pattern.jpg')}/>
        {this.renderRandomAvatar()}
        {this.renderStats()}
        <View  >
          <TouchableHighlight
            style={styles.button}
            onPress= {this.handleSubmit.bind(this)}
            underlayColor="#FFC300">
            <Text style={styles.buttonText}> Start Playing </Text>
          </TouchableHighlight>
       </View>
      </View>
    </ScrollView>

    )
  }
}
module.exports = Profile;
