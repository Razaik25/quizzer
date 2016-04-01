'use strict';
var React = require('react-native');
var _ = require('underscore');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  image: {
    height: 300
  },
  text: {
      color: '#fff',
      alignSelf: 'center',
      fontFamily: 'Helvetica',
      fontSize: 16
  },
  question: {
    backgroundColor: '#4daf51',
    fontFamily: 'Helvetica',
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    fontSize: 18,
    color: '#fff',
    flex: 1

  },

})
class Quiz extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      questioncount: 0,
      score: 0
    };
  }

answerBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
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

  componentDidMount(){


  }

  renderQuestion(){
    // loop to get the current question
    var currentObj = this.props.quizdata[this.state.questioncount];
    var currentQuestion;
    // using underscore .each to loop over the currentObj
    _.each(currentObj, function(value,key){
      if(key ==="question"){
        currentQuestion = value;
      }
    });
    return currentQuestion;
  }

  renderImage(){
    var currentObj = this.props.quizdata[this.state.questioncount];
    var currentImage;
    _.each(currentObj, function(value,key){
      if(key ==="image"){
        currentImage = value;
      }
    });
    return  `http://localhost:3000/images/${currentImage}`;
  }

  renderAnswers(){
    var currentObj = this.props.quizdata[this.state.questioncount];
    var currentAnswers;
    var that = this;
    _.each(currentObj, function(value,key){
      if(key ==="answers"){
        currentAnswers = value.map((answers,index) => {
          return (
            <TouchableHighlight
             key={index}
             style={that.answerBackground(index)}
             onPress={that.handleSubmit}
             underlayColor="#FFC300">
             <Text style={styles.text}>{answers.answer}</Text>
            </TouchableHighlight>
          )
        });
      }
    });
    return currentAnswers;

  }


  checkforAnswer(){

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



module.exports = Quiz;
