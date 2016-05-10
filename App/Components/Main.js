

var React = require('react-native');
var Dimensions = require('Dimensions');
var Animatable = require('react-native-animatable');
var windowSize = Dimensions.get('window');

var Profile = require('./Profile');
var Signup = require('./Signup');
var api = require('../network/api');

var KeyboardSpacer = require('react-native-keyboard-spacer');

// invoking firebase
const Firebase = require('firebase');
// link to the database in firebase
const ref = new Firebase('https://quizzer-raz.firebaseio.com/')

// Fix errors in the page

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Alert,
} = React;



var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      flex: 1,
      backgroundColor: 'transparent'
    },
    bg: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: windowSize.width,
      height: windowSize.height
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 0.5,
      backgroundColor: 'transparent'
    },
    mark: {
      width: 120,
      height: 120,
      borderRadius: 50
    },
    signin: {
      backgroundColor: '#FF3366',
      padding: 20,
      marginBottom: 20,
      alignItems: 'center',
    },
    signup: {
      padding: 20,
      marginBottom: 20,
      backgroundColor: '#FF3366',
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5

    },
    inputs: {
      // marginTop: 10,
      marginBottom: 10,
      flex: .25
    },
    inputPassword: {
      marginLeft: 15,
      width: 20,
      height: 21
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20,
    },
    inputContainer: {
      padding: 10,
      borderWidth: 1,
      borderBottomColor: '#CCC',
      borderColor: 'transparent'
    },
    input: {
      position: 'absolute',
      left: 61,
      top: 12,
      right: 0,
      height: 20,
      fontSize: 22,
      fontWeight: 'bold'
    },
    whiteFont: {
      color: '#FFF',
      fontWeight: '900'
    },
    title: {
      marginBottom: 10,
      fontSize: 30,
      textAlign: 'center',
      color: '#FFF',
      fontWeight: 'bold'
    },
});

class Main extends React.Component{
  // es6 equivalent of get initialState
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      error: false
    }
  }

  PushProfilePage(data){
    this.setState({
      username: '',
      email: '',
      password: '',
    });
    this.props.navigator.push({
      title: `Profile Page`,
      component: Profile,
      passProps: {
        username: this.props.username,
        userstats: data,
        login: true
      }
    });
  }


  PushSignupPage(){
    this.props.navigator.push({
      title: 'Sign up',
      component: Signup
    });

  }

  handleEmail(event){
    this.setState({
      email: event.nativeEvent.text
    });
  }

  handlePassword(event){
    this.setState({
      password: event.nativeEvent.text
    });
  }

  apiRequest(){
    // Make an api request to get all the data relevant to the user
    api.getUser(this.state.email)
       .then((res) =>{
         console.log('data in api',res);
         // passing the data from the Main to Profile component
          this.PushProfilePage(res);
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

  handleSignin(){
    ref.authWithPassword({
      email: this.state.email,
      password: this.state.password
    }, (error, authData) =>{
      if (error) {
          console.log('Login Failed!', error)
          alert('Invalid login credentials, Please try again');
          this.setState({
            isLoading: true,
          });

      } else {
        this.apiRequest();

        }
      }
    );



  }

  render(){

    return(
     <View  style={styles.container}>
       <Image style={styles.bg}
         source={{uri: 'http://www.mobileswall.com/wp-content/uploads/2015/11/901-House-On-The-Rock-Library-l.jpg'}}
       />
       <View style={styles.header}>
          <Image style={styles.mark}
          source={{uri: 'https://cdn.elegantthemes.com/blog/wp-content/uploads/2015/12/quiz.png'}}/>
       </View>
        <Text style={styles.title}> Welcome to Quizzer! </Text>
      <View style={styles.inputs}>

        {/* email section*/}
        <View style={styles.inputContainer}>
          <Image style={styles.inputUsername}
          source={{uri: 'http://i66.tinypic.com/2qltjx3.png'}}/>
          <TextInput style={[styles.input, styles.whiteFont]}
          placeholder="Email"
          placeholderTextColor="#FFF"
          value={this.state.email}
          autoFocus={true}
          onChange={this.handleEmail.bind(this)}/>
        </View>


        {/* password section*/}
        <View style={styles.inputContainer}>
          <Image style={styles.inputPassword}
          source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
          <TextInput style={[styles.input, styles.whiteFont]}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#FFF"
          value={this.state.password}
          autoFocus={true}
          onChange={this.handlePassword.bind(this)}/>
        </View>

        {/* Loading ActivityIndicatorIOS */}
         <ActivityIndicatorIOS
           animating={this.state.isLoading}
           color="#fff"
           size="small"  />

      </View>

      <KeyboardSpacer/>


      {/* Sign In*/}
      <View>
          <TouchableHighlight
          style={styles.signin}
          onPress={this.handleSignin.bind(this)}
          underlayColor="#FFC300">
            <Text style={styles.whiteFont}> Sign In </Text>
          </TouchableHighlight>
      </View>

      {/*Sign up*/}
        <View animation="bounceInUp" >
          <TouchableHighlight
          style={styles.signup}
          onPress={this.PushSignupPage.bind(this)}
          underlayColor="#FFC300">
            <Text style={styles.whiteFont}> Do not have an account? Sign Up</Text>
          </TouchableHighlight>
        </View>

     </View>
   )

  }

}

module.exports = Main;
