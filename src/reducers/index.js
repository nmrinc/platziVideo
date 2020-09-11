import actionTypes from "../actions/actionTypes";


const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_FAVOURITE:
      return {
        ...state,
        mylist: [...state.mylist, action.payload]
      }
      break;
    case actionTypes.REMOVE_FAVOURITE:
      return {
        ...state,
        mylist: state.mylist.filter(items => items.id !== action.payload),
      }
      break;
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        user: action.payload,
      }
      break;
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        user: action.payload,
      }
      break;
    case actionTypes.SIGNUP_REQUEST:
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