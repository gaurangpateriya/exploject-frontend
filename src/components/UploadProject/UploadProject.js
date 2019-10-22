import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'tachyons';
import './UploadProject.css';
import agent from '../../agent'
import { push } from 'react-router-redux';
import { store } from '../../store';
import Navbar from '../Navbar.js'
import {connect } from 'react-redux';

class UploadProject extends Component {
  constructor() {
    super();
    this.state = {fields :{p_name:'',githubLink:'',description:'',tags:''},errors:null}
    this.setValue = this.setValue.bind(this);
    
  }
  
  validateForm() {
    const { fields } = this.state;
    let errors = null;
    let formIsValid = true;
    if (!fields.p_name) {
      formIsValid = false;
      errors= '*Please enter Project name';
    }
    
    if (!fields.description) {
      
        formIsValid = false;
        errors = '*Please enter a valid description.';
      
    }
    

    this.setState({
      errors,
    });
    return formIsValid;
  }

  submitForm(e){
    e.preventDefault();
    if(this.validateForm()){
        this.state.fields.tags = this.state.fields.tags.split(',')
    let data = this.state.fields
    // console.log(data)
      agent.ProfilePage.uploadProject(data).then(res  =>{
        // console.log("Upload Project response",res)
        if(res.data.data.message ===  "Project Uploaded succesfully")
          store.dispatch(push('/'));
      
      })
    }

  }
  setValue(e,value){

    if(value === 'p_name')
      this.setState({fields :{...this.state.fields, p_name: e.target.value}})
    if(value === 'githubLink')
      this.setState({fields :{...this.state.fields, githubLink: e.target.value}})
    if(value === 'description')
      this.setState({fields :{...this.state.fields, description: e.target.value}})
    if(value === 'tags')
      this.setState({fields :{...this.state.fields, tags: e.target.value}})
  }


    render() {
    
      return (
        <div >
        <Navbar/>
          <div className='register-header mt6'>
            <h1>
              Upload Your Project...
            </h1>
          </div>
          
            <article className=" black-80 ba center registerform">
              <legend className='b'>
                Resgister
              </legend>
                <form className='center' onSubmit={this.submitForm.bind(this)}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
         
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Project Name : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" value = {this.state.fields.p_name} onChange={(e) => this.setValue(e,'p_name')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Github Link: </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" value = {this.state.fields.githubLink} onChange={(e) => this.setValue(e,'githubLink')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Descreption : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" value = {this.state.fields.description} onChange={(e) => this.setValue(e,'description')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >tags : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" value = {this.state.fields.tags} onChange={(e) => this.setValue(e,'tags')} />
                    </div>
                    
                    </fieldset>
                    <p>{this.state.errors}</p>
                    <div className="mt3 flex space-between">
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Upload" onChange={(e) => this.setValue(e,'name')} />
                    </div>
                </form>
            </article>
            
        </div>
      );
    }
}


export default UploadProject;
