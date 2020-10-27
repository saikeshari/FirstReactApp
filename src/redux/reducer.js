
//Reducer function is needed to setup the state and all changes to the 
//state can only be made through the reducer function 

import {DISHES} from '../components/shared/dishes';
import {COMMENTS} from '../components/shared/comments';
import {PROMOTIONS} from '../components/shared/promotions';
import {LEADERS} from '../components/shared/leaders';

export const initialState = {
    dishes:DISHES,
    comments:COMMENTS,
    leaders:LEADERS,
    promotions:PROMOTIONS
};

export const Reducer = (state = initialState,action) => {
    return state;
};