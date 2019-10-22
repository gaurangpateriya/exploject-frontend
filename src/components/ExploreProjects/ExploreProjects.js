import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import 'tachyons';
import './ExploreProjects.css';
import agent from '../../agent'
// import { push } from 'react-router-redux';
// import { store } from '../../store';
import { connect } from 'react-redux';
import { GET_USERS_DETAILS ,GET_ALL_PROJECTS} from '../../constants/actionTypes'
import Navbar from '../Navbar'
import { push } from 'react-router-redux';
import { store } from '../../store';

import Project from '../ExploreProjects/Project'
class ExploreProjects extends Component {
  constructor() {
    super();
    this.user ={}
    this.allProjects =[]
  }
  componentWillMount(){
    this.props.getAllProjects()
  }
  componentWillReceiveProps(np) {
    console.log("login message in the login fom",np)
    
      
    if(np.allProjects)
      if (np.allProjects.data) {
        if (np.allProjects.data.projects) {
            
            this.allProjects = np.allProjects.data.projects
        }
      }
  }

  renderProjects(){
    return this.allProjects.map((p,i) => <Project project = {p} key={i} type='explore'/>)
  }
    render() {
      return (
        <div className=''>
            <Navbar/>
            
            <div className='mt5'>
                <h1>
                    All projects
                </h1>
                <div className='flex flex-wrap'>
                    {this.renderProjects()}

                </div>    
            </div>
              
        </div>

           
      );
    }
}

const mapStateToPropps = state =>( {
  usersDetails: state.auth.usersDetails ,
  allProjects : state.auth.allProjects
})
const mapDispatchToProps = dispatch =>({ 
  getUsersDetails: () => dispatch({type:GET_USERS_DETAILS ,payload:agent.ProfilePage.getUserDetails()}) ,
  getAllProjects :() => dispatch({type:GET_ALL_PROJECTS,payload :agent.ProfilePage.getAllProjects()})
})

export default connect(mapStateToPropps,mapDispatchToProps)(ExploreProjects);
