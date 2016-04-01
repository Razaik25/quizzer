
'use strict';
var React = require('react-native');
var Category = require('./Category');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Alert,
} = React;


var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#800000'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  error:{
    flex: 1,
    margin: 10,
    borderRadius: 10,
    height: 60,
    backgroundColor: '#e15258'

  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
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
})

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }
  componentDidMount(){

  }

  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit(){
    console.log(this.state.username)
    this.setState({
      isLoading: true,
    });
    if(this.state.username){
      this.props.navigator.push({
        title: 'Choose Category',
        component: Category,
        passProps:{username: this.state.username}
      });
    } else {
      this.setState({
        isLoading: false,
        error: true
      });
      Alert.alert('Quizzer', 'Please enter your username to begin');
    }

  }
  render(){
    var error = (this.state.error);
    console.log(error);
    return (

        <View style={styles.mainContainer}>
          <Text style={styles.title}> Welcome to Quizzer </Text>
          <TextInput
            style={styles.searchInput}
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Your Name"
          />

          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)}
            underlayColor="#FFC300">
            <Text style={styles.buttonText}> Start the Game </Text>
          </TouchableHighlight>
        </View>
    )
  }

}

module.exports = Main;
