const loadingStateReducer = (state = false, action) => {
  switch (action.type) {
    case 'UPDATE_LOADING_STATE':
      return action.value;
    default:
      return state;
  }
};

export default loadingStateReducer;
