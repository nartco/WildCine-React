const initialState = { SearchM: ' ' }

function searchMovie(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'CHOICEM':
        nextState = {
          ...state,
          SearchM: action.value
        }
      return nextState || state
  default:
    return state
  }
}

export default searchMovie