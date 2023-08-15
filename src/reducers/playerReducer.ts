import { Player } from '../core/types'

export interface CounterState {
  allPlayers: Player[],
  savedPlayers: Record<string, Player>,
}

const initialState: CounterState = {
  allPlayers: [],
  savedPlayers: {},
};

export const playerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ALL_PLAYERS':
      return { ...state, allPlayers: action.data }
    case 'SET_FAVORITE':
      console.log('action.data: ', action.data)
      return { ...state, savedPlayers: action.data }
    default:
      return state
  }
};

// export default playerReducer
