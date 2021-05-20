const initialState = {
  status: 'loading',
  checkboxes: [
    {
      price: 'under $25',
      checked: false,
    },
    {
      price: '$25 to $50',
      checked: false,
    },
    {
      price: '$50 & Above',
      checked: false,
    },
  ],
};

/*TODO add case names*/
export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_ITEMS': {
      console.log('REQUESTING');
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
