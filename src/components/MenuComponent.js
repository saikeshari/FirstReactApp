import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from './shared/baseUrl';

//CALLING `MENU/DISH.ID` IN CASE OF CLICK, NOW GO TO MAIN COMPONENT AND SEE
//REMEBER THESE ARE FWD QOUTES ``

function RenderMenuItem({dish}) {
  return(
    <Card>

      {/* LINK IS ON WHOLE CARD SO WHEN U CLICK ANYWHERE ON ANY DISH CARD
      IT WILL TAKE YOU TO THE LINK */}
      
      <Link to={`/menu/${dish.id}`} >
        <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay body className="ml-5">
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
        </Link>
    </Card>
  );
}

const Menu = (props) => {

        //RENDERING EVERY DISH CARD ONE BY ONE
        const menu = props.dishes.dishes.map((dish) => {
            return(
              <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish}  />
              </div>
            );
        });
        if(props.dishes.isLoading) {
          return(
              <div className="container">
                  <div className="row">
                      <Loading />
                  </div>
              </div>
          );
      }

      else if(props.dishes.errmess) {
          return(
              <div className="container">
                  <div className="row">
                      <h4>{props.dishes.errmess}</h4>
                  </div>
              </div>
          );
      }
      else {
          return(
                <div className="container">
                  <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                      <h3>Menu</h3>
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                        {menu}
                  </div>
              </div>
          );
      }
}

export default Menu;