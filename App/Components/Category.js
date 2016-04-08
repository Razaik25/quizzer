'use strict'

var React = require('react-native');
var api = require('../network/api');
var Quiz = require('./Quiz');
var Animatable = require('react-native-animatable');
var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

var {
  Text,
  View,
  NavigatorIOS,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} = React;

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginLeft: 20,
    marginRight: 20
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center',
    fontFamily: 'Futura'
  },
  title: {
    paddingTop: 20,
    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center',
    color: '#111',
    fontFamily: 'Futura'
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
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  categoryIcon: {
    height: window.height/8.335,
    borderRadius: (window.height/8.3350)/2,
    marginRight: 2,
    width: window.height/8.335,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    backgroundColor: '#F2F2F2',
    // borderRadius: 4,
   borderWidth: 2,
   borderColor: '#F6CED8',

  },
  category: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingLeft: 10

  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    resizeMode:  'stretch'
  },
  overlay: {
    backgroundColor:'rgba(80,94,104,0.7)',
    height: 100,
    width: 100,
    alignItems:'center'
  }
});

class Category extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading: false,
      error: false
    }
  }

  getCurrentRoute(){
    // getting the current category route object
    var currentRoute  = this.props.navigator.navigationContext._currentRoute;
    return currentRoute;
  }

  handleSubmit(category){
    this.setState({
      isLoading: true,
    });
    // Make a request to api to get all the data for the choosen category
    api.getCategory(category)
       .then((res) =>{
         console.log('data in api',res);
         // passing the data from the api to quiz component
         this.props.navigator.push({
           title: `${category} Quiz`,
           component: Quiz,
           passProps: {
             username: this.props.username,
             quizdata: res,
             category: category,
             email: this.props.email,
             startAgainRoute: this.getCurrentRoute()
           }
         });
       })
       .catch((err) => {
         console.log('inside err', err);
         this.setState({
           isLoading: false,
           error: `There was an error: ${err}`
         });
       })
       .done();
  }

  render(){
    var username = this.props.username;
    //  <Image style={styles.bg} source={require('../Media/bg-pattern.jpg')}/>

    return (
     <ScrollView>
      <View style={styles.container}>

        <Animatable.View animation="bounceInLeft" easing="ease-in">
          <Text style={styles.title}>Pick a Category to start {username} </Text>
        </Animatable.View>

        <View style = {styles.category}>
          <Animatable.View animation="bounceInRight" easing="ease-in">
            <Image style={styles.categoryIcon} source={require("../Media/icons/canada.jpg")}/>
            <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this, 'canada')}
            underlayColor="#FFC300">
              <Text style={styles.buttonText}> Canada eh...</Text>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View style={{marginLeft: 40}} animation="bounceInLeft" easing="ease-in">
            <Image style={styles.categoryIcon} source={require("../Media/icons/celebrities.jpg")}/>
            <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubmit.bind(this, 'celebrities')}
              underlayColor="#FFC300">
              <Text style={styles.buttonText}> Celebrities </Text>
            </TouchableHighlight>
          </Animatable.View>
        </View>

      <View style = {styles.category}>
        <Animatable.View animation="bounceInRight" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/coding.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'coding')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Coding </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View  style={{marginLeft: 40, left: 30}} animation="bounceInLeft" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/friends.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'friendstvshow')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Friends-Tv Show </Text>
          </TouchableHighlight>
        </Animatable.View>
      </View>

      <View style = {styles.category}>
        <Animatable.View animation="bounceInRight" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/gk.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'generalknowledge')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> General Knowledge </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceInLeft" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/hp.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'harrypotter')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Harry Potter </Text>
          </TouchableHighlight>
        </Animatable.View>
      </View>

      <View style = {styles.category}>
        <Animatable.View style={{marginRight: 10}} animation="bounceInRight" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/math.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'math')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Math </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View style={{marginLeft: 70}} animation="bounceInLeft" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/arrows.jpg")}/>
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'random')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Random </Text>
          </TouchableHighlight>
        </Animatable.View>
    </View>

      <View style = {styles.category}>
        <Animatable.View animation="bounceInRight" easing="ease-in">
          <Image style={styles.categoryIcon} source={require("../Media/icons/sh.jpg")}/>
            <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubmit.bind(this, 'superheroes')}
              underlayColor="#FFC300">
              <Text style={styles.buttonText}> Super Heros </Text>
            </TouchableHighlight>
        </Animatable.View>
      </View>

    </View>
    </ScrollView>

    );
  }

}

module.exports = Category;
