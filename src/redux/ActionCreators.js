import * as ActionTypes from './ActionTypes';

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