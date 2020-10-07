import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

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

    function RenderComments({comments}){
        if(comments!=null)
        {
            const comm=comments.map((commentDisplay) =>{
                return(
                    <div>
                            <div className="m-3">{commentDisplay.comment}</div>
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
        if(props.selectedDish!=null)
        {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            < RenderDish dish={props.selectedDish} />
                        </div>
                        <RenderComments comments={props.selectedDish.comments} />
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