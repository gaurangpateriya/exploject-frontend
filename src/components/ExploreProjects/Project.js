import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import 'tachyons';
import agent from '../../agent'
// import { push } from 'react-router-redux';
// import { store } from '../../store';
import { connect } from 'react-redux';
import { GET_USERS_DETAILS ,GET_PROJECTS} from '../../constants/actionTypes'
import Navbar from '../Navbar'
import { push } from 'react-router-redux';
import { store } from '../../store';
import './ExploreProjects.css'
import tag from '../../tag.png'

class Project extends Component {
  constructor() {
    super();
    this.state={render:false}
    this.project ={}
  }
  componentWillMount(){
    this.project = this.props.project
    console.log("project = ",this.project)
  }
  deleteProject(){
      let data ={p_id : this.project.p_id}
      console.log(data)
      agent.ProfilePage.deletetProject(data).then(res => {
          console.log(res)
          this.props.getUsersProjects()
          this.setState({render : this.state.render})
      }).catch(err => console.log("error in the delete project",err))
  }
  renderTags(tags){
    return tags.map((t,i) => (
      <div className='flex'>
        <img src={tag}alt ='' width={20} height={20}/>
        <p className='mt0'>{t}</p>
      </div>
      
    ))
  }
    // con
    render() {
        if(this.props.type ==='explore'){
        let {description,githubLink,p_id,p_name,tags,u_id,name} = this.project

          return (
            <div >
                <div className='project-div '>
                  <div className ='ml4 mr4'>
                      <h3>{p_name}</h3>
                      <div className='flex'>

                        <h5 className='mt0'> Made By : </h5>
                        <p className='mt0'>   {name} </p>
                      </div>
                      
                      <div className='flex'>
                        <p className='mt0'> Github Link :</p>
                        <a href ={githubLink} className=''>  {githubLink}</a>
                      </div>
                      < h5 className='mt0'> Description : </h5>
                      <p className='mt0'> {description} </p>
                      <div className='flex'>
                      {
                        this.renderTags(tags)
                      }
                      </div>
                      
                      
                  </div>
                </div>
            </div>  
          );
        }else{
        let {description,githubLink,p_id,p_name,tags,u_id} = this.project

          return (
            <div >
                <div className='project-div '>
                  <div className ='ml4 '>
                      <h3>{p_name}</h3>
                      <h5> Description : </h5>
                      <p className='mt0'> {description} </p>
                      <div className='flex'>
                        <p className='mt0'> Github Link :</p>
                        <a href ={githubLink} className=''>  {githubLink}</a>
                      </div>
                      <div className='flex'>
                        {
                          this.renderTags(tags)
                        }
                      </div>
                  </div>
                  <input className="delete-btn " type="button" value="Delete Project" onClick={()=> this.deleteProject()}/>

                </div>
            </div>  
          );

        }
        
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

export default connect(mapStateToPropps,mapDispatchToProps)(Project);
