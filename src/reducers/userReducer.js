const initialState = { username: '', start: true };

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_USERNAME':
      return Object.assign({}, state, { username: action.payload });

    case 'START_END':
      return Object.assign({}, state, { start: action.payload });

    default:
      return state;
  }
}
