import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import './HeaderComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import About from './AboutUsComponent';

//uses state to define variables dishes,comments,promos,leaders to be used here
const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
};

class Main extends Component{
  
  constructor(props){
    super(props);
  }


  render() {
    //DISPLAYING FEATURED DISH,LEADER,PROMOTION
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]} 
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
              promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
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

        <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
         />
      );
    }

    return (
      <div>
        < Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />

          {/* PARAMETER - DISHID */}
          <Route path="/menu/:dishId" component={dishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

//for connecting Main component to the store provided by redux
export default withRouter(connect(mapStateToProps)(Main));
