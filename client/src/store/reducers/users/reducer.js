const initialState = { status: 'loading' };

export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USERS': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'RECEIVE_USERS': {
      return {
        ...state,
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
