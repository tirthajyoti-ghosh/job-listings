const jobDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_JOB_DETAILS':
      return action.value;
    default:
      return state;
  }
};

export default jobDetailsReducer;
