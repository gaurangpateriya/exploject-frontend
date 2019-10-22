import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'tachyons';
import './LoginPage.css';
import agent from '../../agent'
import { push } from 'react-router-redux';
import { store } from '../../store';
import { connect } from 'react-redux';
import { LOGIN } from '../../constants/actionTypes'
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {fields:{password:'',email:''},errors:null}
    this.setValue = this.setValue.bind(this);
  }
  componentWillReceiveProps(np) {
      console.log("login message in the login fom",np)
    if (np.loginMessage.data) {
      if (np.loginMessage.data.message) {
        if (np.loginMessage.data.message === 'Login successfull !!!') {
          
          store.dispatch(push(`/`));
        }
    }
    }
  }

  validateForm() {
    const { fields } = this.state;
    let errors = null;
    let formIsValid = true;
    
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
      this.props.login(data)
    }

  }
  setValue(e,value){

    if(value === 'password')
      this.setState({fields :{...this.state.fields, password: e.target.value}})
    if(value === 'email')
      this.setState({fields :{...this.state.fields, email: e.target.value}})
    
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
            <legend className="b">Login</legend>
                <form  onSubmit={this.submitForm.bind(this)}>
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="ph0 mh0 fw6 clip">Login</legend>
                   
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Email address : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="email" value = {this.state.fields.email} onChange={(e) => this.setValue(e,'email')} />
                    </div>
                    <div className="mt3">
                        <label className="db fw4 lh-copy f6" >Password : </label>
                        <input className="pa2 input-reset ba bg-transparent w-100 measure" type="password" value = {this.state.fields.password} onChange={(e) => this.setValue(e,'password')} />
                    </div>
                    
                    </fieldset>
                    <p>{this.state.errors}</p>
                    <div className="mt3">
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="Login" onChange={(e) => this.setValue(e,'name')} />
                      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 ml5" type="button" value="Register" onClick={(e) => store.dispatch(push('/register'))} />

                    </div>
                </form>
            </article>
        </div>
      );
    }
}

const mapStateToPropps = state =>( {loginMessage: state.auth.loginMessage })
const mapDispatchToProps = dispatch =>({ login: (data) => dispatch({type:LOGIN ,payload:agent.Auth.login(data)}) })

export default connect(mapStateToPropps,mapDispatchToProps)(LoginPage);
