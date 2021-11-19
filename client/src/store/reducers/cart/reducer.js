const initialState = {
  status: 'idle',
  total: 0,
  items: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_CART': {
      return {
        ...state,
        status: 'loading',
      };
    }
    case 'RECEIVE_CART': {
      // console.log('REDUCER USER', action);
      // const { user } = action;

      return {
        ...state,
        status: 'idle',
        // data: user,
      };
    }

    case 'ADD_ITEM': {
      const { _id, qty, price } = action.item;
      let newState = { ...state };

      const alreadyInCart = state.items.some((ele, i) => {
        if (ele._id === _id) {
          newState.items[i].qty += qty;
          newState.total += Math.abs(price * qty);
          return true;
        }
        return false;
      });

      if (!alreadyInCart) {
        newState = {
          ...newState,
          total: newState.total + Math.abs(price * qty),
          items: [...state.items, action.item],
        };
      }

      return { ...newState, status: 'idle' };
    }

    case 'REMOVE_ITEM': {
      const { itemId } = action;
      const newState = { ...state };

      newState.items.map((item, i) => {
        if (item._id === itemId) {
          newState.total -= Math.abs(item.qty * item.price);
          newState.items.splice(i, 1);
        }
        return 0;
      });
      return { ...newState, status: 'idle' };
    }

    case 'UPDATE_QUANTITY':
      console.log('UPDATING');
      return {
        ...state,
        [action._id]: {
          ...state[action._id],
          quantity: action.quantity,
        },
      };

    case 'CLEAR_CART': {
      console.log('CLEAR');
      return {
        ...initialState,
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
