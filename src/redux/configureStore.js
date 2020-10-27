
//Just for convenience
//makes store using reducer function to get states from it and exports it

import {createStore} from 'redux';
import {Reducer, initialState} from './reducer';

export const ConfigureStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};