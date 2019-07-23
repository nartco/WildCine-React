import { createStore, combineReducers } from 'redux';
import choiceMovie from './Reducers/moviesReducers'
import SearchM from './Reducers/searchReducers'
import toggleFavorite from './Reducers/favoriteReducers';


const Combireducer = combineReducers({
    SearchM,
    choiceMovie,
    toggleFavorite
})

export default createStore(Combireducer)