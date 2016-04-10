
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
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: windowSize.width,
    height: windowSize.height/2.4

  },

  // text: {
  //   color: '#fff',
  //   fontSize: 25,
  //   marginBottom: 50,
  //   fontFamily: 'Helvetica',
  // },

  button: {
    height: 60,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#5cb860',
    fontSize: 16,
    fontFamily: 'Futura',
  },
  wrapper: {
    backgroundColor: '#2E2E2E',
    flex: 0.4,
  },
  slide: {
   flex: 1,
  marginLeft:2,
  marginRight: 2,
   justifyContent: 'center',
   backgroundColor: 'transparent',
  },
  text: {
   color: '#fff',
   fontSize: 22,
   fontWeight: 'bold',
 },
 resultText: {
   color: '#FFF380',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15
 },
 categoryText: {
   color: '#347C17',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15,
   marginBottom: 5
 },
 scoreText: {
   color: '#800517',
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
    var obj =[];
    this.props.quizdata.forEach((el,index) =>{
        // looping over the answers to match the answer id to correct
        // get the value of the answer if asnwer id and correct matche
        el.answers.forEach((answer,id) =>{
          if( id+1 === el.correct){
            var temp = {
              question: el.question,
              answer: answer.answer
            };
            obj.push(temp);
          }
      }); // end el.answers

    }); // end this.props.forEach
    return [<Text key={questionnumber}>{obj[questionnumber].question}</Text>, <Text key={questionnumber+1}> {"\n"}Correct Answer: {obj[questionnumber].answer}</Text>];

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
      <Text style={{color: '#842DCE', fontWeight: 'bold', marginBottom: 40}}>Question: <Text style={{
        color: '#007aff',
        fontSize: 20,
        fontWeight: 'bold'

      }}>{index + 1}</Text>/{total}</Text>
    </View>
  )
}


  render(){
    // <View style={styles.container}>
    //  <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate" style={styles.text}>
    //    {this.props.username} you scored {this.props.score} out of 7
    //  </Animatable.Text>
    //
    //  <Animatable.View style={styles.button} animation="bounceInLeft" easing="ease-in">
    //    <TouchableHighlight style={styles.button} onPress={this.startAgain.bind(this)} underlayColor="#FFC300">
    //      <Text  style={styles.buttonText}>Play Again </Text>
    //    </TouchableHighlight>
    // </Animatable.View>
    //
    // <Animatable.View style={styles.button} animation="bounceInRight" easing="ease-in">
    //   <TouchableHighlight style={styles.button} onPress={this.differentPlayer.bind(this)} underlayColor="#FFC300">
    //     <Animatable.Text style={styles.buttonText}>Different Player?</Animatable.Text>
    //   </TouchableHighlight>
    // </Animatable.View>
    //
    // <Animatable.View style={styles.button} animation="bounceInRight" easing="ease-in">
    //   <TouchableHighlight style={styles.button} onPress={this.handleScoreboard.bind(this)} underlayColor="#FFC300">
    //     <Animatable.Text style={styles.buttonText}>View Profile</Animatable.Text>
    //   </TouchableHighlight>
    // </Animatable.View>
    // </View>
    //  {this.props.username.toUpperCase()}

    return(


      <ScrollView>


        <View style={{flex: 0.1, backgroundColor: '#111', alignItems: 'center'}}>
           <Text style={styles.resultText}> RESULTS </Text>
           <Text style={styles.categoryText}> {this.props.category.toUpperCase()} </Text>
            <Animatable.Text animation="bounceInLeft" easing="ease-in" style={styles.scoreText}>
               Your Score {this.props.score}/7
            </Animatable.Text>
        </View>

        <Separator />

        <View style={{flex: 0.1, backgroundColor: '#2E2E2E', alignItems: 'center'}}>
          <Text style={styles.resultText}> QUESTIONS </Text>
        </View>


        <View>
         <Swiper style={styles.wrapper}height={240}
             renderPagination={this.renderPagination}
             paginationStyle={{
               bottom: -23, left: null, right: 10,
             }} loop={false}>
             <View style={styles.slide} title={<Text style={{color: '#842DCE', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(0)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}> </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(1)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}> </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(2)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}> </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(3)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}> </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(4)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}> </Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(5)}</Text>
             </View>

             <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
               <Text style={styles.text}> {this.renderQuestionWithAnswer(6)}</Text>
             </View>

           </Swiper>

         </View>
        <Separator />


          <View style={styles.container}>
           <Animatable.View style={styles.button} animation="bounceInLeft" easing="ease-in">
             <TouchableHighlight style={styles.button} onPress={this.startAgain.bind(this)} underlayColor="#FFC300">
               <Text  style={styles.buttonText}>Play Again </Text>
             </TouchableHighlight>
          </Animatable.View>

          <Animatable.View style={styles.button} animation="bounceInRight" easing="ease-in">
            <TouchableHighlight style={styles.button} onPress={this.differentPlayer.bind(this)} underlayColor="#FFC300">
              <Animatable.Text style={styles.buttonText}>Different Player?</Animatable.Text>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View style={styles.button} animation="bounceInRight" easing="ease-in">
            <TouchableHighlight style={styles.button} onPress={this.handleScoreboard.bind(this)} underlayColor="#FFC300">
              <Animatable.Text style={styles.buttonText}>View Profile</Animatable.Text>
            </TouchableHighlight>
          </Animatable.View>
          </View>






    </ScrollView>

    )
  }
}
module.exports = Result;
