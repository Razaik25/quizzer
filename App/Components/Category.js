'use strict'

var React = require('react-native');
var api = require('../network/api');

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
    marginTop: 10,
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
    marginBottom: 20,
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
  handleSubmit(category){
    this.setState({
      isLoading: true,
    });
    console.log('insubmit', category);
    // Make a request to api to get all the data for the choosen category
    api.getCategory(category)
       .then((res) =>{
         // passing the data from the api to quiz component
         this.props.navigator.push({
           title: `${category} Quiz`,
           component: Quiz,
           passProps: {quizdata: res}
         });
       })
       .catch((err) => {
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
        <Text style={styles.title}>Choose Categories to start</Text>
        <Text style={styles.title}>{username}</Text>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Canada </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'celebrities')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Celebrities </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'coding')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Coding </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'friendstvshow')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Friends-Tv Show </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'generalknowledge')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> General Knowledge </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'harrypotter')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Harry Potter </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'math')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Math </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'random')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Random </Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this, 'trivia')}
          underlayColor="#FFC300">
            <Text style={styles.buttonText}> Trivia </Text>
          </TouchableHighlight>

        </ScrollView>
      </View>

    );
  }

}

module.exports = Category;
