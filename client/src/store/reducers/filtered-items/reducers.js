const initialState = { status: 'loading' };

/*TODO add case names*/
export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_FILTERED_ITEMS': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'RECEIVE_FILTERED_ITEMS': {
      const { filterId, items, page, filter } = action;

      return {
        ...state,
        status: 'idle',
        [`${filterId}_${page}`]: {
          items: items,
          filter: filter,
        },
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
