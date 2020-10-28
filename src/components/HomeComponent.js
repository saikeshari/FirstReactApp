import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import { Loading } from './LoadingComponent';

//RENDER CARD OF LEADER,PROMOTION,DISH ONE BY ONE
function RenderCard({item, isLoading, errmess}){
    if(isLoading){
        return(
            <Loading />
        );
    }
    else if(errmess) {
        return(
            <h4>{errmess}</h4>
        );
    }
    else {
        return(
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
    }
}

//PROPS ARE FEATURED DISH, PROMOTION, LEADER
function Home(props){
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.item} 
                        isLoading={props.isLoading} 
                        errmess={props.errmess}  />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;