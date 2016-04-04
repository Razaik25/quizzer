var React = require('react-native');
var Main = require('./App/Components/Main');

var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  NavigatorIOS,
  Navigator,
  View
} = React;

class quizzer extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Quiz App', component: Main }}
        configureScene={(route) => ({
          ...Navigator.SceneConfigs.FloatFromRight
        })}
        renderScene={(route, navigator) => {
          if (route.component) {
            return <route.component navigator={navigator} {...route.passProps} />;
          }
        }}

      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  }
});

AppRegistry.registerComponent('quizzer', () => quizzer);
