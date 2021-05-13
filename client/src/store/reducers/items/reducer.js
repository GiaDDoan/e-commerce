const initialState = { status: 'loading' };

/*TODO add case names*/
export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ITEMS': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'RECEIVE_ITEMS': {
      const { categoryPage, items } = action;

      return {
        ...state,
        status: 'idle',
        [categoryPage]: items,
      };
    }

    case 'SEND_ERROR': {
      return {
        ...state,
        status: 'error',
      };
    }

    default: {
      return state;
    }
  }
}
