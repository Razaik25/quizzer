var React = require('react-native');
// var api = require('../helper/api')


var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
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
      userinput: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(event){
    this.setState({
      userinput: event.nativeEvent.text
    })
  }

  handleSubmit(){
    console.log(this.state.userinput)
    this.setState({
      isLoading: true,
    });

  }

  render(){
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}> Welcome to Quizzer </Text>

        <TextInput
        style={styles.searchInput}
        value={this.state.userinput}
        onChange={this.handleChange.bind(this)}
        placeholder="Enter Your Name"
         />

        <TouchableHighlight
        style={styles.button}
        onPress={this.handleSubmit.bind(this)}
        underlayColor="white">
          <Text style={styles.buttonText}> Start the Game </Text>
        </TouchableHighlight>

      </View>
    )
  }

}

module.exports = Main;
