const initialState = { username: '', start: true };

export default function(state = initialState, action) {
  const box = state;
  switch (action.type) {
    case 'SET_USERNAME':
      box.username = action.payload;
      return box;

    case 'START_END':
      box.start = action.payload;
      return box;

    default:
      return state;
  }
}
