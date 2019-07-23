const initialState = { Film: 0 }

export default function choiceMovie(state = initialState, action) {
  let nextState
  switch (action.type) {
      case 'CHOICEMOVIE':
        nextState ={
            ...state,
            Film: action.value
        }
        return nextState || state
default:
    return state
  }
}