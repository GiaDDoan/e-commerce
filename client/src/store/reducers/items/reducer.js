const initialState = { status: 'loading' };

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
      const { category, page, items, uniqueCompanies } = action;
      console.log('HOII', category, page);

      return {
        ...state,
        status: 'idle',
        [category]: uniqueCompanies,
        [`${category}_${page}`]: items,
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
