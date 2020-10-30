import * as ActionTypes from './ActionTypes';

//work of every action type
export const Comments = (state={
    errmess:null,
    comments:[]
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {...state, isLoading:false, errmess:null, comments:action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading:false, errmess:action.payload, comments:[]};

        case ActionTypes.ADD_COMMENT:
             var comment=action.payload;
             comment.date=new Date().toISOString();
             //concat join the new comment to the previous state and then we return it
             return {...state, comments:state.comments.concat(comment)};

        default:
            return state;
    }
}