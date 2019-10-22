import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'tachyons';
import './HomePage.css';
import Navbar from '../Navbar'

class HomePage extends Component {
  constructor() {
    super();
    
  }
  componentWillMount(){

  }

    render() {
    
      return (
        <div className="home-body">
          <div className="header">
            <Navbar/>
            <h1>Exploreject</h1>



          </div>
          
        </div>
      );
    }
}


export default HomePage;
