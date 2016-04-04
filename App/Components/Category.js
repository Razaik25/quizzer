'use strict'

var React = require('react-native');
var api = require('../network/api');
var Quiz = require('./Quiz');
var Animatable = require('react-native-animatable');
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
    backgroundColor: '#48BBEC'
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  title: {
    marginBottom: 30,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
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
    return (
      <View style={styles.container}>
       <ScrollView>
      <Animatable.View animation="bounceIn">
        <Text style={styles.title}>Choose Categories to start</Text>
        <Text style={styles.title}>{username}</Text>
       </Animatable.View>

      <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'canada')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Canada eh...</Text>
          </TouchableHighlight>
       </Animatable.View>

       <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'celebrities')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Celebrities </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'coding')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Coding </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'friendstvshow')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Friends-Tv Show </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'generalknowledge')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> General Knowledge </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'harrypotter')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Harry Potter </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'math')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Math </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'random')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Random </Text>
          </TouchableHighlight>
        </Animatable.View>

        <Animatable.View animation="bounceIn">
            <TouchableHighlight
              style={styles.button}
              onPress={this.handleSubmit.bind(this, 'superheroes')}
              underlayColor="#FFC300">
              <Text style={styles.buttonText}> Super Heros </Text>
            </TouchableHighlight>
        </Animatable.View>

        </ScrollView>
      </View>

    );
  }

}

module.exports = Category;
