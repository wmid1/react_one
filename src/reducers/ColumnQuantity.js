const initialState = [1, 2, 3, 4];

export default function(state = initialState, action) {
  const arrayQuant = [...state];
  switch (action.type) {
    case 'ADD_QUANT':
      if (arrayQuant.length === 0) {
        arrayQuant[0] = 1;
      } else {
        arrayQuant[Math.max(...state)] = Math.max(...state) + 1;
      }
      return arrayQuant;
    case 'DEL_QUANT':
      arrayQuant.splice(arrayQuant.indexOf(action.payload), 1);
      return arrayQuant;

    default:
      return state;
  }
}
