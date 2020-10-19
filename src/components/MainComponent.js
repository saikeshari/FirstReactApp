import React, { Component } from 'react';
import Home from './HomeComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent';
import './HeaderComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {DISHES} from '../components/shared/dishes';
import {COMMENTS} from '../components/shared/comments';
import {PROMOTIONS} from '../components/shared/promotions';
import {LEADERS} from '../components/shared/leaders';
import { Switch, Route, REdirect, Redirect } from 'react-router-dom';
import About from './AboutUsComponent';

class Main extends Component{
  
  constructor(props){
    super(props);

    this.state= {
      dishes:DISHES,
      comments:COMMENTS,
      leaders:LEADERS,
      promotions:PROMOTIONS
    };
  }

  render() {
    //DISPLAYING FEATURED DISH,LEADER,PROMOTION
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
              promotion={this.state.promotions.filter((promotion) => promotion.featured)[0]}
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

        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
          comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
         />
      );
    }

    return (
      <div>
        < Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />

          {/* PARAMETER - DISHID */}
          <Route path="/menu/:dishId" component={dishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} /> } />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default Main;
