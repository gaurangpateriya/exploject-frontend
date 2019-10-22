import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import auth from './components/reducer';
// import pubmed from './pubmed/reducers';
import common from './common/reducers';
// import screening from './screening/reducers';
// import annotatedtext from './annotatedtext/reducers';
// import audit from './audit/reducers';
// import settings from './settings/reducers';
// import { tweetReducer, currentlyHoveredTagReducer } from './entityTagging/reducer';


export const appReducer = history => combineReducers({
  auth,
  // screening,
  // pubmed,
  common,
  // annotatedtext,
  // audit,
  // settings,
  router: connectRouter(history),
  // reportDetails: tweetReducer,
  // currentlyHoveredTag: currentlyHoveredTagReducer,
});

export const rootReducer = history => (state, action) => {
  if (action.type === 'LOGOUT') {
    const { router, common } = state;
    // const commonState = { common: defaultState };
    state = { router, common };
  }
  return appReducer(history)(state, action);
};
