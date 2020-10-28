import * as ActionTypes from './ActionTypes';
import {DISHES} from '../components/shared/dishes';
//specifies the payload (variables necesaary) to do the desired action type

export const addComment = (dishId, rating, author, comment) => ({
    type:ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});

//this is a thunk as it return a FUNCTION
export const fetchDishes = () => (dispatch) => {

    //this thunk is dispatching 2 functions
    //first, this it call dishLoading with parameter true and then -
    dispatch(dishesLoading(true));

    //second dispatch to add dishes to store after a delay of 2000 ms after calling dishesLoading function
    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000)
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
})