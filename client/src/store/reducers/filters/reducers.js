const initialState = {
  prices: [
    {
      price: 'Under $25',
      min: 0,
      max: 25,
      checked: false,
      id: 'checkboxOne',
    },
    {
      price: '$25 to $50',
      min: 25,
      max: 50,
      checked: false,
      id: 'checkboxTwo',
    },
    {
      price: '$50 & Above',
      min: 50,
      max: null,
      checked: false,
      id: 'checkboxThree',
    },
  ],
  status: 'loading',
};

export default function titlesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_INITIAL_PRICES': {
      // const copyState = { ...state };

      state.prices.map((price) => {
        if (price.checked) price.checked = false;
      });
      return {
        ...state,
        status: 'idle',
      };
    }
    case 'RECEIVE_PRICES': {
      return {
        ...initialState,
        status: 'idle',
      };
    }
    case 'TOGGLE_CHECKBOX': {
      const { index } = action;
      const copyState = { ...state };

      if (copyState.prices[index].checked === false) {
        for (let i = 0; i < copyState.prices.length; i++) {
          if (copyState.prices[i].checked === true) {
            copyState.prices[i].checked = false;
          }
        }
      }

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
