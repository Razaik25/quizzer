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
    backgroundColor: '#c43235'
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 15,
    color: '#111',
    alignSelf: 'center',
    fontFamily: 'Futura',
    marginBottom: 5
  },
  title: {
    paddingTop: 20,
    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Futura',
    fontWeight: 'bold'
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
    borderRadius: 10,
    marginRight: 2,
    width: window.height/8.335,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    backgroundColor: '#F2F2F2',
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
    marginBottom: 30,
    marginTop: 25,
    paddingLeft: 10

  },
  bg: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    resizeMode:  'cover'
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

    var username = this.props.username.toUpperCase();
    return (
     <ScrollView>

      <View style={styles.container}>

        <Animatable.View animation="bounceInLeft" easing="ease-in">
          <Text style={styles.title}>Pick a Category {username} </Text>
        </Animatable.View>

        <View style = {styles.category}>
          <Animatable.View animation="bounceInRight" easing="ease-in">
            <Text style={styles.buttonText}> Canada eh...</Text>
            <TouchableHighlight
            onPress={this.handleSubmit.bind(this, 'canada')}
            underlayColor="#000080">
              <Image style={styles.categoryIcon} source={require("../Media/icons/canada.jpg")}/>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View style={{marginLeft: 40}} animation="bounceInLeft" easing="ease-in">
            <Text style={styles.buttonText}> Celebrities </Text>
            <TouchableHighlight
              onPress={this.handleSubmit.bind(this, 'celebrities')}
              underlayColor="#000080">
                <Image style={styles.categoryIcon} source={require("../Media/icons/celebrities.jpg")}/>
            </TouchableHighlight>
          </Animatable.View>
        </View>

      <View style = {styles.category}>
        <Animatable.View animation="bounceInRight" easing="ease-in">
          <Text style={styles.buttonText}> Coding </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'coding')}
          underlayColor="#000080">
            <Image style={styles.categoryIcon} source={require("../Media/icons/coding.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View  style={{marginLeft: 40, left: 20}} animation="bounceInLeft" easing="ease-in">
          <Text style={styles.buttonText}> Friends Show </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'friendstvshow')}
          underlayColor="#000080">
            <Image style={styles.categoryIcon} source={require("../Media/icons/friends.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>
      </View>

      <View style = {styles.category}>
        <Animatable.View style={{marginRight: window.height/25}} animation="bounceInRight" easing="ease-in">
          <Text style={styles.buttonText}> General Facts </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'generalknowledge')}
          underlayColor="#000080">
           <Image style={styles.categoryIcon} source={require("../Media/icons/gk.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View style={{left: window.height/60}} animation="bounceInLeft" easing="ease-in">
          <Text style={styles.buttonText}> Harry Potter </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'harrypotter')}
          underlayColor="#000080">
            <Image style={styles.categoryIcon} source={require("../Media/icons/hp.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>
      </View>

      <View style = {styles.category}>
        <Animatable.View style={{marginRight: 10}} animation="bounceInRight" easing="ease-in">
          <Text style={styles.buttonText}> Math </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'math')}
          underlayColor="#000080">
            <Image style={[styles.categoryIcon]} source={require("../Media/icons/math.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View style={{marginLeft: 55}} animation="bounceInLeft" easing="ease-in">
            <Text style={styles.buttonText}> Random </Text>
          <TouchableHighlight
          onPress={this.handleSubmit.bind(this, 'random')}
          underlayColor="#000080">
           <Image style={styles.categoryIcon} source={require("../Media/icons/arrows.jpg")}/>
          </TouchableHighlight>
        </Animatable.View>
    </View>

      <View style = {styles.category}>
        <Animatable.View animation="bounceInRight" easing="ease-in">
          <Text style={styles.buttonText}> Super Heros </Text>
            <TouchableHighlight
              onPress={this.handleSubmit.bind(this, 'superheroes')}
              underlayColor="#000080">
                <Image style={styles.categoryIcon} source={require("../Media/icons/sh.jpg")}/>
            </TouchableHighlight>
        </Animatable.View>
      </View>

    </View>
    </ScrollView>

    );
  }

}

module.exports = Category;
