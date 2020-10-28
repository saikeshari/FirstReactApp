
//Just for convenience
//makes store using reducer function to get states from it and exports it

//combineReducer to add individual reducers to make a global state
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Dishes} from './dishes';
import {Comments} from './comments';
import {Promotions} from './promotions';
import {Leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders
        }),
        //for making use of thunk and logger in our application
        applyMiddleware(thunk,logger)
    );

    return store;
};