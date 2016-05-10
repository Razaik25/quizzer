
import Main from './app/components/Main';

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  Navigator,
  View,
} from 'react-native';

class quizzer extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'Quiz App', component: Main }}
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
