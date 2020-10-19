import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap'
import {Link} from 'react-router-dom';

//DISPLAYING DISH DETAILS IN A CARD
    function RenderDish({dish}){
        if(dish!=null)
        {
          return(
            <Card>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          )
        }
        else{
          return(
            <div></div>
          ); 
        }
    }

    //DISPLAYING DISH COMMENTS 
    function RenderComments({comments}){
        if(comments!=null)
        {
            const comm=comments.map((commentDisplay) =>{
                return(
                    <div>
                            <div className="m-3">{commentDisplay.comment}</div>
                            {/* NEW INTL.DATA.TIME.FORMAT CONVERTS DATE INTO AS SUCH DISPLAYED NORMALLY */}
                            <div className="m-3">-- {commentDisplay.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(commentDisplay.date))) }</div>
                    </div>
                );
            });

            return(
                <div className="col-12 col-md-5 m-1">
                    <div>
                        <h4><strong>Comments</strong></h4>
                    </div>
                    <ul className="list-unstyled">
                        <div>{comm}</div>
                    </ul>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }

    const Dishdetail = (props) =>
    {
        if(props.dish!=null)
        {
            return(
                <div className="container">
                    <div className="row">
                   <Breadcrumb>
                      <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                   </Breadcrumb>
                   <div className="col-12">
                     <h3>{props.dish.name}</h3>
                     <hr />
                   </div>
                 </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            < RenderDish dish={props.dish} />
                        </div>
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }

export default Dishdetail;