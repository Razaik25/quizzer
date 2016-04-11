
'use strict';
var React = require('react-native');
var Animatable = require('react-native-animatable');
var api = require('../network/api');
var ScoreBoard = require('./Scoreboard');
var Swiper = require('react-native-swiper');
var Separator = require('./Separator');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

const {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  ScrollView,
  Image,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddfd4',
    width: windowSize.width,
    height: windowSize.height/2.2,
    marginTop: 0,
    flexDirection: 'column'
  },

  playAgain:{
    backgroundColor: '#3fb0ac',
    padding: 20,
    marginTop:20,
    marginBottom: 20,
    alignItems: 'center',

  },
  differentPlayer:{
    backgroundColor: '#4AA02C',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center'

  },
  profile: {
    backgroundColor: '#e62739',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontFamily: 'Futura'
  },
  wrapper: {
    backgroundColor: '#fae596',

  },
  slide: {
  //  flex: 0.05,
   marginTop: 30,
   marginLeft:5,
   marginRight: 5,
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: 'transparent',
  },
  text: {
   color: '#111',
   fontSize: 22,
   fontFamily: 'Futura'
  //  fontWeight: 'bold',
 },
 resultText: {

   color: '#111',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15
 },
 questionText: {
   color: '#8C001A',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15

 },
 categoryText: {
   color: '#347C17',
  //  color: '#fff',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15,
   marginBottom: 5
 },
 scoreText: {
   color: '#111',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 10,
   marginBottom: 5
 }


});

class Result extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      goToScoreboard: false
    };
  }


  startAgain(){
    // getting the category route
    var startroute = this.props.startAgainRoute;
    // passing the category route to navigator
    this.props.navigator.popToRoute(startroute);
  }

  differentPlayer(){
     // going back to the top most route
     this.props.navigator.popToTop();
  }

  handleScoreboard(){
    this.setState({
      goToScoreboard: true
    })
   this.updateScore();
  }

  viewScoreboard(data){
    this.props.navigator.push({
      title: `ScoreBoard Page`,
      component: ScoreBoard,
      passProps: {
        userstats: data,
        startAgainRoute: this.props.startAgainRoute
      }
    });
  }

  renderQuestionWithAnswer(questionnumber){
    var questionArr =[];
    this.props.quizdata.forEach((el,index) =>{
        // looping over the answers to match the answer id to correct
        // get the value of the answer if asnwer id and correct matche
        el.answers.forEach((answer,id) =>{
          if( id+1 === el.correct){
            var temp = {
              question: el.question,
              answer: answer.answer
            };
            questionArr.push(temp);
          }
      }); // end el.answers

    }); // end this.props.forEach

    return [<Text key={questionnumber}>{questionArr[questionnumber].question}</Text>, <Text key={questionnumber+1}> {"\n"} {"\n"} Answer: {questionArr[questionnumber].answer}</Text>];

  }

  renderUserAnswers(questionnumber){
    var userAnsnwerArr =[];
      this.props.quizdata.forEach((el,index) =>{
        el.answers.forEach((answer,id) =>{
          if (answer.id ===this.props.userAnswer[questionnumber]){
            userAnsnwerArr.push(answer.answer);
          }
        });// end el.asnwers
      }); // end this.props.quizdata

      return <Text>{userAnsnwerArr[questionnumber]}</Text>

  }

  updateScore(){
    // update the score in the database by making a call to the api
    api.updateUser(this.props.email, this.props.category, this.props.score)
       .then((res) =>{
         console.log('updated sucessfully',res);
         if(this.state.goToScoreboard){
           this.viewScoreboard(res);
         }
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

  componentDidMount(){
    this.updateScore();
  }


renderPagination(index, total, context) {

  return (
    <View style={{
      position: 'absolute',
      bottom: -25,
      right: 10

    }}>
      <Text style={{color: '#111',  fontSize: 15, fontWeight: 'bold',marginBottom: 40}}>Question: <Text style={{
        color: '#008080',
        fontSize: 15,
        fontWeight: 'bold'

      }}>{index + 1}</Text>/{total}</Text>
    </View>
  )
}


  render(){
    console.log('in result',this.props.quizdata);
    return(
      <ScrollView>
        <Animatable.View animation="flipInY" easing="ease-in" style={{flex: 0.1, backgroundColor: '#dddfd4', alignItems: 'center'}}>
           <Text   style={styles.resultText}> RESULTS </Text>
           <Text   style={styles.categoryText}> {this.props.category.toUpperCase()} </Text>
            <Text  style={styles.scoreText}>
               Your Score {this.props.score}/7
            </Text>
        </Animatable.View>
        <Separator />
        <Animatable.View  animation="flipInY" >
          <View style={{backgroundColor: '#fae596', alignItems: 'center'}}>
            <Text style={styles.questionText}> QUESTIONS </Text>
          </View>

          <View>
            <Swiper style={styles.wrapper}height={240}
              renderPagination={this.renderPagination}
              paginationStyle={{
                bottom: -23, left: null, right: 10,
              }} loop={false}>

              <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(0)} </Text>}>
                <Text style={styles.text}> {this.renderQuestionWithAnswer(0)}</Text>
              </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(1)}</Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(1)}</Text>
             </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(2)} </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(2)}</Text>
             </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(3)}</Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(3)}</Text>
             </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(4)}</Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(4)}</Text>
             </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(5)}</Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(5)}</Text>
             </View>

             <View style={styles.slide} title={<Text style={{color: '#111', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer: {this.renderUserAnswers(6)}</Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(6)}</Text>
             </View>

           </Swiper>
         </View>
        </Animatable.View>

        <Separator />
          <View style={styles.container}>
            <Animatable.View  animation="flipInX" easing="ease-in" >
              <TouchableHighlight style={styles.playAgain} onPress={this.startAgain.bind(this)} underlayColor="#fff">
                <Text  style={styles.buttonText}>Play Again </Text>
              </TouchableHighlight>
            </Animatable.View>

           <Animatable.View  animation="flipInX" easing="ease-in" >
             <TouchableHighlight style={styles.differentPlayer} onPress={this.differentPlayer.bind(this)} underlayColor="#fff">
               <Animatable.Text style={styles.buttonText}>Different Player</Animatable.Text>
             </TouchableHighlight>
            </Animatable.View>

            <Animatable.View animation="flipInX" easing="ease-in" >
              <TouchableHighlight style={styles.profile} onPress={this.handleScoreboard.bind(this)} underlayColor="#fff">
                <Animatable.Text style={styles.buttonText}>View Profile</Animatable.Text>
              </TouchableHighlight>
            </Animatable.View>

          </View>
        </ScrollView>
    )
  }
}
module.exports = Result;
