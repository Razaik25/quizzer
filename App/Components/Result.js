
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
    width: windowSize.width,
    height: windowSize.height/2.4,
    marginTop: 0,
    flexDirection: 'column'
  },

  // text: {
  //   color: '#fff',
  //   fontSize: 25,
  //   marginBottom: 50,
  //   fontFamily: 'Helvetica',
  // },

  playAgain:{
    backgroundColor: '#5CB3FF',
    padding: 20,
    marginTop:20,
    marginBottom: 20,
    alignItems: 'center',

  },
  differentPlayer:{
    backgroundColor: '#387C44',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center'

  },
  profile: {
    backgroundColor: '#FDD017',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#111',
    fontSize: 16,
    fontFamily: 'Futura',
  },
  wrapper: {
    backgroundColor: '#6D7B8D',

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
   color: '#fff',
   fontSize: 22,
   fontFamily: 'Futura'
  //  fontWeight: 'bold',
 },
 resultText: {

   color: '#B6B6B4',
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
  //  color: '#347C17',
   color: '#fff',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 15,
   marginBottom: 5
 },
 scoreText: {
   color: '#FBB917',
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
    return [<Text key={questionnumber}>{obj[questionnumber].question}</Text>, <Text key={questionnumber+1}> {"\n"} {"\n"} Answer: {obj[questionnumber].answer}</Text>];

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
      <Text style={{color: '#fff',  fontSize: 15, fontWeight: 'bold',marginBottom: 40}}>Question: <Text style={{
        color: '#5CB3FF',
        fontSize: 15,
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
           <Animatable.Text  animation="bounceInLeft" easing="ease-in" style={styles.resultText}> RESULTS </Animatable.Text>
           <Animatable.Text animation="bounceInRight" easing="ease-in" style={styles.categoryText}> {this.props.category.toUpperCase()} </Animatable.Text>
            <Animatable.Text animation="bounceInLeft" easing="ease-in" style={styles.scoreText}>
               Your Score {this.props.score}/7
            </Animatable.Text>
        </View>

        <Separator />

        <Animatable.View animation="bounceInLeft" easing="ease-in" style={{backgroundColor: '#6D7B8D', alignItems: 'center'}}>
          <Text style={styles.questionText}> QUESTIONS </Text>
        </Animatable.View>


        <Animatable.View  animation="bounceInRight" easing="ease-in">
         <Swiper style={styles.wrapper}height={240}
             renderPagination={this.renderPagination}
             paginationStyle={{
               bottom: -23, left: null, right: 10,
             }} loop={false}>
             <View style={styles.slide} title={<Text style={{color: '#fff', fontWeight: 'bold', marginBottom: 80}} numberOfLines={1}>Your answer </Text>}>
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
         </Animatable.View>

        <Separator />
          <View style={styles.container}>
           <Animatable.View  animation="bounceInLeft" easing="ease-in">
             <TouchableHighlight style={styles.playAgain} onPress={this.startAgain.bind(this)} underlayColor="#fff">
               <Text  style={styles.buttonText}>Play Again </Text>
             </TouchableHighlight>
          </Animatable.View>

          <Animatable.View  animation="bounceInRight" easing="ease-in">
            <TouchableHighlight style={styles.differentPlayer} onPress={this.differentPlayer.bind(this)} underlayColor="#fff">
              <Animatable.Text style={styles.buttonText}>Different Player</Animatable.Text>
            </TouchableHighlight>
          </Animatable.View>

          <Animatable.View animation="bounceInLeft" easing="ease-in">
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
