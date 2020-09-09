const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVOURITE':
      return {
        ...state.cats,
        cats: { ...state.cats, mylist: [...state.cats.mylist, action.payload] }
      }
      break;
    default:
      return state;
      break;
  }
}

export default reducer;