// import { toast } from 'react-toastify';
import agent from './agent';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  REGISTER,
} from './constants/actionTypes';
import { push } from 'react-router-redux';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => (action) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const { skipTracking } = action;

    action.payload
      .then(
        (response) => {
          const currentState = store.getState();
          if (!skipTracking && currentState.viewChangeCounter !== currentView) {
            return;
          }

          action.payload = response.data;
          store.dispatch({ type: ASYNC_END, promise: action.payload });
          store.dispatch(action);
        },
        (error) => {
          console.log('error ', error);
          // // let status;
          // // let errorMessage = 'Server Error';
          // // if (error.response) {
          // //   // The request was made and the server responded with a status code
          // //   // that falls out of the range of 2xx
          // //   console.debug(error.response.data);
          // //   errorMessage = error.response.data.data.message;
          // //   status = error.response.status;
          // // } else if (error.request) {
          // //   // The request was made but no response was received
          // //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // //   // http.ClientRequest in node.js
          // //   console.debug(error.request);
          // // } else {
          // //   // Something happened in setting up the request that triggered an Error
          // //   console.debug('Error', error.message);
          // // }
          // // const currentState = store.getState();
          // // if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          // //   return;
          // // }
          // // if (status === 404) {
          // //   try {
          // //     toast.error(errorMessage);
          // //   } catch (err) {
          // //     console.debug(err);
          // //   }
          // //   console.debug('ERRIIOIIO----->', error.response.status);
          // //   action.payload =  error.response.data ;
          // //   store.dispatch(action);
          // // }
          // // action.error = true;
          // // // action.payload = {};
          // // action.payload = error.response.body || {};
          // // if (!action.skipTracking) {
          // //   store.dispatch({ type: ASYNC_END, promise: action.payload });
          // // }
          // // if (action.type !== LOGIN && (status === 401 || status === 403)) {
          // //   window.localStorage.setItem('bearer', '');
          // //   agent.setToken(null);
          // //   store.dispatch({ type: LOGOUT, promise: action.payload });
          // // } else {
          // //   try {
          // //     toast.error(errorMessage);
          // //   } catch (err) {
          // //     console.debug(err);
          // //   }
          // }
        },
      );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => (action) => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      console.log('chkkk', action);
      window.localStorage.setItem('bearer', action.payload.data.token);
      agent.setToken(action.payload.data.token);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('bearer', null);
    window.localStorage.setItem('root',null)
    console.log('logout');
    agent.setToken(null);
    store.dispatch(push('/register'))
  }

  next(action);
};


export { promiseMiddleware, localStorageMiddleware };
