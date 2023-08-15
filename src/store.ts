import { createStore, combineReducers } from 'redux'
import { playerReducer } from './reducers/playerReducer'

const rootReducer = combineReducers({
  playerReducer
});

const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

export default store
