import * as ActionTypes from './ActionTypes';

export const Dishes = (state={
    //isLoading is true bcoz at starting dishes array is empty and we have to load sishes from some where
    isLoading:true,
    //errmess will have value when DISHES_FAILED action is called
    errmess: null,
    //dishes wont be empty when ad dishes will be called
    dishes: []
        }, action) => {

        switch(action.type) {
            case ActionTypes.ADD_DISHES:
                return {...state, isLoading:false, errmess:null, dishes:action.payload}


            case ActionTypes.DISHES_LOADING:
                //this is ES6 sprint func, witthis we say ...state means all the state 
                //and after that, we pass modifcations to it
                return {...state, isLoading:true, errmess:null, dishes:[]}


            case ActionTypes.DISHES_FAILED:
                return {...state, isLoading:false, errmess:action.payload, dishes:[]}

                //IT CAN JUDGE THE PAYLOAD AUTO IN 2 SITUATIONS
            default:
                return state;
        }
}