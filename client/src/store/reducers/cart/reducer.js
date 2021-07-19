const initialState = { status: 'loading' };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CART': {
      return {
        ...state,
        items: [],
        status: 'loading',
      };
    }
    case 'RECEIVE_CART': {
      console.log('REDUCER USER', action);
      // const { user } = action;

      return {
        ...state,
        status: 'idle',
        // data: user,
      };
    }

    case 'ADD_ITEM': {
      const { item } = action;

      return {
        ...state,
        status: 'idle',
        items: {
          ...state.items,
          [item._id]: {
            ...item,
            qty: state.items[item._id]
              ? state.items[item._id].qty + item.qty
              : item.qty,
          },
        },
      };
    }

    case 'REMOVE_ITEM': {
      const stateCopy = { ...state };
      delete stateCopy[action.item._id];
      return stateCopy;
    }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        [action._id]: {
          ...state[action._id],
          quantity: action.quantity,
        },
      };

    case 'CLEAR_CART':
      return { ...initialState };

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

export const receiveCart = (user) => ({
  type: 'RECEIVE_CART',
  user,
});

export const sendError = (error) => ({
  type: 'SEND_ERROR',
  error,
});
