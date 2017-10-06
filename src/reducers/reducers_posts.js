import { FETCH_POSTS, FETCH_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      const post = action.payload.data;
      return { ...state, [action.payload.data.id]: action.payload.data };
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    //mapkeys from lodash: take a dataset to transform as the first arg,
    //and pick a key to set as the ID on the newly transformed object
    default:
      return state;
  }
}
