const initialState = { status: 'loading' };

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_USER': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'RECEIVE_USER': {
      const { user } = action;

      return {
        ...state,
        status: 'idle',
        data: user,
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
