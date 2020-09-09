const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVOURITE':
      return {
        ...state,
        cats: { ...state.cats, mylist: [...state.cats.mylist, action.payload] }
      }
      break;
    case 'REMOVE_FAVOURITE':
      return {
        ...state,
        cats: { ...state.cats, mylist: state.cats.mylist.filter(items => items.id !== action.payload) }
      }
      break;
    default:
      return state;
      break;
  }
}

export default reducer;