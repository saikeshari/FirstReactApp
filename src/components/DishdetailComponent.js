import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    renderDish(dish){
        if(dish!=null)
        {
          return(
            <Card>
              <CardImg width="100%" object src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
          <     CardText>{dish.description}</CardText>
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

    renderComments(comments){
        if(comments!=null)
        {
            const comm=comments.map((commentDisplay) =>{
                return(
                    <div>
                            <div className="m-3">{commentDisplay.comment}</div>
                            <div className="m-3">-- {commentDisplay.author} , {commentDisplay.date}</div>
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

    render()
    {
        if(this.props.selectedDish!=null)
        {
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    {this.renderComments(this.props.selectedDish.comments)}
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
}

export default Dishdetail;