import {COMMENTS} from '../components/shared/comments';
import * as ActionTypes from './ActionTypes';


//work of every action type
export const Comments = (state=COMMENTS, action) => {
    switch(action.type) {
        case ActionTypes.ADD_COMMENT:
             var comment=action.payload;
             comment.id=state.length;
             comment.date=new Date().toISOString();
             //concat join the new comment to the previous state and then we return it
             return state.concat(comment);
        default:
            return state;
    }
}