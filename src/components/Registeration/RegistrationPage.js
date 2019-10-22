import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'tachyons';
import './RegistrationPage.css';
import agent from '../../agent'
import { push } from 'react-router-redux';
import { store } from '../../store';

class RegistrationPage extends Component {
  constructor() {
    super();
    this.state = {fields:{name:'',profilepic:'',phone_number:'',password:'',email:''},errors:null}
    this.setValue = this.setValue.bind(this);
    
  }
  
  validateForm() {
    const { fields } = this.state;
    let errors = null;
    let formIsValid = true;
    if (!fields.name) {
      formIsValid = false;
      errors= '*Please enter Name';
    }
    if (!fields.phone_number && fields.phone_number.length !== 10) {
      formIsValid = false;
      errors = '*Please enter 10 digit mobile number';
    }
    if (typeof fields.email !== 'undefined') {
      const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields.email)) {
        formIsValid = false;
        errors = '*Please enter a valid email id.';
      }
    }
    if (typeof fields.password !== 'undefined') {
      if (!fields.password.match(/^.*(?=.{8,})/)) {
        formIsValid = false;
        errors = '*Password must be greater than 8 characters.';
      }
    }
    
    if (!fields.about ) {
      formIsValid = false;
      errors = '*Please enter About';
    }

    this.setState({
      errors,
    });
    return formIsValid;
  }

  submitForm(e){
    e.preventDefault();
    if(this.validateForm()){
      let data = this.state.fields
      console.log(data)
      agent.Auth.register(data).then(res  =>{
        console.log("registration response",res)
        if(res.data.data.message === 'user registered')
          store.dispatch(push('/login'));
      
      })
    }

  }
  setValue(e,value){

    if(value === 'name')
      this.setState({fields :{...this.state.fields, name: e.target.value}})
    if(value === 'phone_number')
      this.setState({fields :{...this.state.fields, phone_number: e.target.value}})
    if(value === 'password')
      this.setState({fields :{...this.state.fields, password: e.target.value}})
    if(value === 'email')
      this.setState({fields :{...this.state.fields, email: e.target.value}})
    if(value === 'about')
      this.setState({fields :{...this.state.fields, about: e.target.value}})
    if(value === 'profilepic')
      this.setState({fields :{...this.state.fields, profilepic: e.target.value}})
  }


    render() {
    
      return (
        <div >
          <div className='register-header'>
            <h1>
              Explorject
            </h1>
            <p>
              Explore Your Projects....
            </p>
          </div>
          
            <article className=" black-80 ba center registerform">
              <legend className='b'>
                Resgister
              </legend>
                <form className='center' onSubmit={this.submitForm.bind(this)}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Name : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="text" value = {this.state.fields.name} onChange={(e) => this.setValue(e,'name')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Phone number : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="number" value = {this.state.fields.phone_number} onChange={(e) => this.setValue(e,'phone_number')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Email address : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" value = {this.state.fields.email} onChange={(e) => this.setValue(e,'email')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Password : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="password" value = {this.state.fields.password} onChange={(e) => this.setValue(e,'password')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >About :</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" value = {this.state.fields.about} onChange={(e) => this.setValue(e,'about')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Profile picture :</label>
                        <input className="b pa2 input-reset ba bg-transparent" type="text" value = {this.state.fields.profilepic} onChange={(e) => this.setValue(e,'profilepic')} />
                    </div>
                    </fieldset>
                    <p>{this.state.errors}</p>
                    <div className="mt3 flex space-between">
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Sign Up" onChange={(e) => this.setValue(e,'name')} />
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 ml5" type="button" value="Login" onClick={(e) => store.dispatch(push('/login'))} />

                    </div>
                </form>
            </article>
            
        </div>
      );
    }
}


export default RegistrationPage;
