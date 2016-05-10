'use strict';

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  Vibration,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import _ from 'underscore';

import Result from './Result';

export default class Quiz extends Component{

  constructor(props){
    super(props);
    this.state ={
      questioncount: 0,
      score: 0,
      userAnswer: [],
      shuffleddata: ''

    };
  }

  answerBackground(btn){
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
    }
    if(btn === 0){
      obj.backgroundColor = '#9e4d83';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else if (btn === 2){
      obj.backgroundColor = '#758BF4';
    } else {
      obj.backgroundColor = '#3079ab';
    }
    return obj;
  }

  hideTouchableHighlights(btn){
    const obj = {
      display: 'none'
    }
    return obj;
  }

  shuffle(){
    const shuffleddata = _.shuffle(this.props.quizdata);
    this.setState({
      shuffleddata: shuffleddata
    });

  }

  componentDidMount(){
    this.shuffle();
  }

  renderQuestion(){
    // loop to get the current question
    const currentObj = this.state.shuffleddata[this.state.questioncount];
    let currentQuestion;
    // using underscore .each to loop over the currentObj
    _.each(currentObj, function(value,key){
      if(key ==="question"){
        currentQuestion = value;
      }
    });
    return currentQuestion;
  }

  renderImage(){

    const currentObj = this.state.shuffleddata[this.state.questioncount];
    let currentImage;
    _.each(currentObj, function(value,key){
      if(key ==="image"){
        currentImage = value;
      }
    });

    // adding heroku server
    // return  `http://localhost:3000/images/${currentImage}`;
    return  `https://quizzer-api.herokuapp.com/images/${currentImage}`;

  }

  renderAnswers(){
    const currentObj = this.state.shuffleddata[this.state.questioncount];
    let currentAnswers;
    const that = this;
    _.each(currentObj, function(value,key){
      if(key ==="answers"){
        currentAnswers = value.map((answers,index) => {
          return (
            <TouchableHighlight
             key={index}
             style={that.answerBackground(index)}
             onPress={that.handleAnswers.bind(that, answers.id)}
             underlayColor="#FFC300">
             <Text style={styles.text}>{answers.answer}</Text>
            </TouchableHighlight>
          )
        });
      }
    });
    return currentAnswers;

  }

  pushResultPage(){
    this.props.navigator.push({
      title: 'Results',
      component: Result,
      passProps: {
        username: this.props.username,
        score: this.state.score,
        category: this.props.category,
        email: this.props.email,
        startAgainRoute: this.props.startAgainRoute,
        quizdata: this.state.shuffleddata,
        userAnswer: this.state.userAnswer
      }
    });
  }

  handleAnswers(answerid){
    // compare the answer id for to the correct answer
    const currentobj = this.state.shuffleddata[this.state.questioncount];
    const userAnsArr = this.state.userAnswer;
    userAnsArr.push(answerid);

    // if the user gives correct answer
    if(currentobj.correct === parseInt(answerid) ){
    // increment the score and the question count and set the state
      this.setState({
        score: this.state.score + 1,
        questioncount: this.state.questioncount + 1,
        userAnswer: userAnsArr
      })

      // play the right sound

    } else {  // if the answer does not match, move to the next question
      //  play the wrong sound
      // vibrate
      Vibration.vibrate();
      this.setState({
        questioncount: this.state.questioncount + 1,
        userAnswer: userAnsArr
      })

    }

    // check if the question count is 7 then pass the data to the result component
    // call the pushResultPage function
    if(this.state.questioncount === 7){
      this.pushResultPage();
    }
  }

  render(){
    return (
      <View style={styles.mainContainer}>
        <Image source ={{uri: this.renderImage()}} style={styles.image}/>
        <Text style ={styles.question}>{this.renderQuestion()}</Text>
        {this.renderAnswers()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image: {
    height: 260
  },
  text: {
      color: '#fff',
      alignSelf: 'center',
      fontFamily: 'Futura',
      fontSize: 16,

  },
  question: {
    backgroundColor: '#4daf51',
    fontFamily: 'Futura',
    flexDirection: 'row',
    alignSelf: 'stretch',
    fontSize: 16,
    color: '#fff',
    flex: 1,
    paddingLeft: 10,
    textAlign: 'center'
  },

});
