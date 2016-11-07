import { DEMO } from 'actions/types';

const demo = (state = {}, action) => {
  switch (action.type) {
    case DEMO:
      return {
        ...state,
        demo: true,
      };
    default:
      return state;
  }
}

export default demo;
