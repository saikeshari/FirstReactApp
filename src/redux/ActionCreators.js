import * as ActionTypes from './ActionTypes';
import {DISHES} from '../components/shared/dishes';
import {baseUrl} from '../components/shared/baseUrl';
//specifies the payload (variables necesaary) to do the desired action type

export const addComment = (comment) => ({
    type:ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId : dishId,
        rating : rating, 
        author : author,
        comment : comment
    }
    newComment.date=new Date().toISOString();

    //use POST method to post the comment
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body : JSON.stringify(newComment),
        headers : {
            'Content-Type' : 'application/json', 
        },
        credentials : 'same-origin'
    })
    .then(Response => {
        if(Response.ok) {
            return Response;
        }
        else{
            var error = new Error('Error'+Response.status+':'+Response.statusText);
            error.Response=Response;
            throw error;
        }
    },
    //server isnt working
    error => {
        var errmess=new Error(error.message);
        throw errmess;
    })

    //the application will add an id to the response we sent and returns the updates response
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {console.log('Post comments' + error.message)
        alert('Your comment could not be posted\nError: ' + error.message)})
}

//this is a thunk as it return a FUNCTION
export const fetchDishes = () => (dispatch) => {

    //this thunk is dispatching 2 functions
    //first, this it call dishLoading with parameter true and then -
    dispatch(dishesLoading(true));

    //second dispatch to add dishes to store after a delay of 2000 ms after calling dishesLoading function
    return fetch(baseUrl+'dishes')
        .then(Response => {
            if(Response.ok) {
                return Response;
            }
            else{
                var error = new Error('Error'+Response.status+':'+Response.statusText);
                error.Response=Response;
                throw error;
            }
        },
        //server isnt working
        error => {
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(Response => Response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesfailed(error.message)))
};

//Below 3 functions are action creators which are returning ACTION ONJECTS

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesfailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch) => {

    //this thunk is dispatching 2 functions
    //first, this it call dishLoading with parameter true and then -
    dispatch(dishesLoading(true));

    //second dispatch to add dishes to store after a delay of 2000 ms after calling dishesLoading function
    return fetch(baseUrl+'comments')
    .then(Response => {
        if(Response.ok) {
            return Response;
        }
        else{
            var error = new Error('Error'+Response.status+':'+Response.statusText);
            error.Response=Response;
            throw error;
        }
    },
    //server isnt working
    error => {
        var errmess=new Error(error.message);
        throw errmess;
    })
        .then(Response => Response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsfailed(error.message)))

};

export const commentsfailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromos = () => (dispatch) => {

    //this thunk is dispatching 2 functions
    //first, this it call dishLoading with parameter true and then -
    dispatch(promosLoading(true));

    //second dispatch to add dishes to store after a delay of 2000 ms after calling dishesLoading function
    return fetch(baseUrl+'promotions')
        .then(Response => {
            if(Response.ok) {
                return Response;
            }
            else{
                var error = new Error('Error'+Response.status+':'+Response.statusText);
                error.Response=Response;
                throw error;
            }
        },
        //server isnt working
        error => {
            var errmess=new Error(error.message);
            throw errmess;
        })
        .then(Response => Response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosfailed(error.message)))

};

//Below 3 functions are action creators which are returning ACTION ONJECTS

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosfailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});