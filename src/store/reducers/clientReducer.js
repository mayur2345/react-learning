import { ACTIONS } from '../../properties/actions';

const initialState = {
  client: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SAVE_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case ACTIONS.REMOVE_CLIENT:
      return {
        ...state,
        client: {}
      };
    default:
      return state;
  }
}
