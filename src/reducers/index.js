const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVOURITE':
      return {
        ...state,
        mylist: [...state.mylist, action.payload]
      }
      break;
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        mylist: state.mylist.filter(items => items.id !== action.payload),
      }
      break;
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      }
      break;
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      }
      break;
    default:
      return state;
      break;
  }
}

export default reducer;