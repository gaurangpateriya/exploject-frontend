import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { APP_LOAD, REDIRECT } from './constants/actionTypes';
import { store } from './store';
import agent from './agent';
import {HomePage, RegisterationPage, LoginPage, UsersProfile , UploadProject, ExploreProjects} from './components';

// import Login from './components/Login';
// import 'react-toastify/dist/ReactToastify.css';
// import { Slide, ToastContainer } from 'react-toastify';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
  apiKey: state.common.apiKey,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, apiKey) => dispatch({
    type: APP_LOAD,
    payload,
    apiKey,
    skipTracking: true,

  }),
  onRedirect: (route) => dispatch({ type: REDIRECT, payload: route }),
  clearReducer: () => dispatch({ type: 'CLEAR' }),
});

class App extends Component {
  constructor(props) {
    super(props);    
  }

  componentWillMount() {
    const token = window.localStorage.getItem('bearer');
    if (token) {
      console.log('token', token);

      agent.setToken(token);
    }
    if (token === null) {
      console.log('in the if block', token)
      store.dispatch(push('/register'));
      this.props.onRedirect('/register');
    }
    
    // store.dispatch(push('/tagging/12'));
    this.props.onLoad(token ? 1 : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.history.location !== nextProps.history.location) {
      this.props.onRedirect(nextProps.history.location);
    }
    if (nextProps.redirectTo && nextProps.redirectTo !== this.props.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
    }
  }



  render() {


    return (
      <div className='register-background' >
        <ConnectedRouter history={this.props.history}>
          <Switch>
            <Route path="/register" component={RegisterationPage} exact />
            <Route path="/login" component={LoginPage} exact />
            <Route path="/" component={UsersProfile} exact />
            <Route path="/project_upload" component={UploadProject} exact />
            <Route path="/explore" component={ExploreProjects} exact />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
