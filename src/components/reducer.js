import {
  LOGIN,
  GET_USERS_DETAILS,
  LOGOUT,
  GET_PROJECTS,
  GET_ALL_PROJECTS
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {...state, loginMessage : action.payload}
    case GET_USERS_DETAILS:
      return {...state, usersDetails : action.payload}
    case GET_PROJECTS:
      return {...state, usersProjects : action.payload}
    case GET_ALL_PROJECTS:
      return {...state ,allProjects : action.payload}
      case LOGOUT :
    
    default:
      return state;
  }

};
