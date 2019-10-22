import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import 'tachyons';
import './UsersProfile.css';
import agent from '../../agent'
// import { push } from 'react-router-redux';
// import { store } from '../../store';
import { connect } from 'react-redux';
import { GET_USERS_DETAILS ,GET_PROJECTS} from '../../constants/actionTypes'
import Navbar from '../Navbar'
import { push } from 'react-router-redux';
import { store } from '../../store';

import Project from '../ExploreProjects/Project'
class UsersProfile extends Component {
  constructor() {
    super();
    this.user ={}
    this.usersProjects =[]
  }
  componentWillMount(){
    this.props.getUsersDetails()
    this.props.getUsersProjects()
  }
  componentWillReceiveProps(np) {
    console.log("login message in the login fom",np)
    if(np.usersDetails)
      if (np.usersDetails.data) {
        if (np.usersDetails.data.user) {
          if (np.usersDetails.data.user) {
            
            this.user = np.usersDetails.data.user
          }
        }
      }
    if(np.usersProjects)
      if (np.usersProjects.data) {
        if (np.usersProjects.data.projects) {
            
            this.usersProjects = np.usersProjects.data.projects
        }
      }
  }

  renderProjects(){
    return this.usersProjects.map((p,i) => <Project project = {p} key={i} type='profile'/>)
  }
    render() {
      let {u_id, name, about, phone_number, email,profilepic} = this.user
      return (
        <div >
            <Navbar/>
            <img src={profilepic} className='profile-cover-img'/>
            <div className='flex profile-main-div '>
              <div className='profile-side-div w-30'>
                <img src={profilepic} className='profile-side-img'/>
                <div className='center '>
                  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 center " type="button" value="Upload Project" onClick={()=> store.dispatch(push('/project_upload'))}/>
                  <h4>Email id :</h4>
                  <p>{email}</p>  
                  <h4>Phone number : </h4>
                  <p>{phone_number}</p>  
                  <h4 className='center'>About</h4>
                  <p>{about} :</p>  
                </div>
                
              </div>
              <div className='w-70 profile-cover-main mt8'>
                <h1 className='profile-main-name'> {name}</h1>
                <br/>
                <h3> Your Projects : </h3>
                {this.renderProjects()}

              </div>
            </div>

          </div>
           
      );
    }
}

const mapStateToPropps = state =>( {
  usersDetails: state.auth.usersDetails ,
  usersProjects : state.auth.usersProjects
})
const mapDispatchToProps = dispatch =>({ 
  getUsersDetails: () => dispatch({type:GET_USERS_DETAILS ,payload:agent.ProfilePage.getUserDetails()}) ,
  getUsersProjects :() => dispatch({type:GET_PROJECTS,payload :agent.ProfilePage.getUsersProjects()})
})

export default connect(mapStateToPropps,mapDispatchToProps)(UsersProfile);
