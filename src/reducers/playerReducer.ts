import { Player } from '../core/types'

export interface CounterState {
  allPlayers: Player[],
  savedPlayers: Record<string, Player>,
  loading: boolean,
}

const initialState: CounterState = {
  allPlayers: [],
  savedPlayers: {},
  loading: true,
};

export const playerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ALL_PLAYERS':
      return { ...state, allPlayers: action.data }
    case 'SET_FAVORITE':
      return { ...state, savedPlayers: action.data }
    case 'SET_LOADING':
      return { ...state, loading: action.data }
    default:
      return state
  }
};

// export default playerReducer
