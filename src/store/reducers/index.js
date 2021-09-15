import { combineReducers } from 'redux';

import loadingStateReducer from './loadingState';
import jobSearchResultsReducer from './jobSearchResults';
import jobDetailsReducer from './jobDetails';
import peopleDetailsReducer from './peopleDetails';
import peopleSearchResultsReducer from './peopleSearchResults';

export default combineReducers({
  isLoading: loadingStateReducer,
  jobSearchResults: jobSearchResultsReducer,
  jobDetails: jobDetailsReducer,
  peopleDetails: peopleDetailsReducer,
  peopleSearchResults: peopleSearchResultsReducer,
});
