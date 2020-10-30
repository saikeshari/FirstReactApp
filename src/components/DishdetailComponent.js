import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, Button, CardText,Row, CardBody, CardTitle, BreadcrumbItem, Breadcrumb,
    Modal, ModalBody,ModalHeader, Form, FormGroup, Input, Label, Col } from 'reactstrap'
import {Link} from 'react-router-dom';
import {Control, LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from './shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

//validation functions
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len); 

//DISPLAYING DISH DETAILS IN A CARD
    function RenderDish({dish}){
        if(dish!=null)
        {
          return(
            <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>
                <CardImg width="100%" object src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
                </Card>
            </FadeTransform>
          )
        }
        else{
          return(
            <div></div>
          ); 
        }
    }

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen:false
            }
            this.handleSubmit=this.handleSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }

        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        handleSubmit(values){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
            //calling postComments function to add comment into comments to bw shown
            this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render(){
            return(
                <React.Fragment>
                    <Button outline color="secondary" onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span>
                        <span> Submit Comment</span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader><hr></hr>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label  htmlFor="Rating">Rating</Label>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="Author">Your Name</Label>
                                    <Control.text model=".author" name="author" 
                                    className="form-control" 
                                    validators={{
                                        minLength:minLength(2), maxLength:maxLength(15)
                                    }}/>
                                    <Errors 
                                    className="text-danger"
                                    model=".author" 
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="Comment">Comment</Label>
                                    <Control.textarea model=".comment" name="comment" 
                                    className="form-control" rows="6"/>
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">Submit</Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
                
            )
        }
    }


    //DISPLAYING DISH COMMENTS 
    function RenderComments({comments, postComment, dishId}){
        if(comments!=null)
        {
            const comm=comments.map((commentDisplay) =>{
                return(
                    <div>
                        <Fade in>
                                <div className="m-3">{commentDisplay.comment}</div>
                                {/* NEW INTL.DATA.TIME.FORMAT CONVERTS DATE INTO AS SUCH DISPLAYED NORMALLY */}
                                <div className="m-3">-- {commentDisplay.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(commentDisplay.date))) }</div>
                        </Fade>
                    </div>
                );
            });

            return(
                <div className="col-12 col-md-5 m-1">
                    <div>
                        <h4><strong>Comments</strong></h4>
                    </div>
                    <ul className="list-unstyled">
                        <Stagger in>
                            <div>{comm}</div>
                        </Stagger>
                    </ul>
                    <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
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
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if(props.errmess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errmess}</h4>
                    </div>
                </div>
            );
        }
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
                        <RenderComments comments={props.comments} 
                        postComment={props.postComment}
                        dishId={props.dish.id} />
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