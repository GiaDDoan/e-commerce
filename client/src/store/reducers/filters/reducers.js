const initialState = {
  prices: [
    {
      price: 'under $25',
      min: 0,
      max: 25,
      checked: false,
    },
    {
      price: '$25 to $50',
      min: 25,
      max: 50,
      checked: false,
    },
    {
      price: '$50 & Above',
      min: 50,
      max: 200,
      checked: false,
    },
  ],
  status: 'loading',
};

export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_INITIAL_PRICES': {
      const copyState = { ...state };

      copyState.prices.map((price) => {
        if (price.checked) price.checked = false;
      });
      return {
        ...initialState,
        status: 'idle',
      };
    }
    case 'TOGGLE_CHECKBOX': {
      const { index } = action;
      const copyState = { ...state };

      copyState.prices[index].checked = copyState.prices[index].checked
        ? false
        : true;

      return {
        ...state,
        status: 'idle',
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
