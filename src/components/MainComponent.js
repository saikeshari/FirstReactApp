import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import './HeaderComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import About from './AboutUsComponent';
//now, postComment is accessible to the user intead of addCommeny
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

//uses state to define variables dishes,comments,promos,leaders to be used here
const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

//it dispatches the function with desired parameters for an action to take place
//by writing this we can make use of it in maincomponent
//remember every action can be taken place through dispatch
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, message, contactType) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, message, contactType))
})

class Main extends Component{
  

  //this is a lifecycle methos
  //it says when component is mounting, dishes will be fetched
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }


  render() {
    //DISPLAYING FEATURED DISH,LEADER,PROMOTION
    const HomePage = () => {
      //console.log("hi");
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]} 
              dishesLoading = {this.props.dishes.isLoading}
              dishesErrMess = {this.props.dishes.errmess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
              leadersLoading = {this.props.leaders.isLoading}
              leadersErrMess = {this.props.leaders.errmess}
              promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
              promosLoading = {this.props.promotions.isLoading}
              promosErrMess = {this.props.promotions.errmess}
        />
      );
    }

    //WHEN IT IS CLICKED IN MENUCOMPONENT, IT GOES TO LINK `MENU/DISHID` NOW THIS DISH-ID WAS 
    //PASSED AS $(DISH.ID) IT CONVERTS IT INTO JSON FORMAT
    //WHEN RECEIVING, ROUTE AHS 3 PROPS - MATCH,LOCATION,HISTORY (WE ARE ONLY INTERESTED IN MATCH)
    const dishWithId = ({match}) => {
      return(

        // PARSEINT IS A JS FUNCTION WHICH WILL CONVERT THE THE GIVEN STRING OF NUMBERS 
        // ACCORDING TO THE BASE OR RADIX SPECIFIED

        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
              isLoading = {this.props.dishes.isLoading}
              errmess = {this.props.dishes.errmess}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
              commentsErrMess={this.props.comments.errmess}
              postComment={this.props.postComment}
            />
      );
    }

    return (
      <div>
        < Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}> 
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />

              {/* PARAMETER - DISHID */}
              <Route path="/menu/:dishId" component={dishWithId} />
              <Route exact path="/contactus" component={() => 
                <Contact 
                  resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}/>} />
              <Route exact path="/aboutus" component={() => 
                <About leaders={this.props.leaders.leaders}/> } />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

//for connecting Main component to the store provided by redux
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
