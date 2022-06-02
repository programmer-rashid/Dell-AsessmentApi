import React, { Component }  from 'react';
import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Department} from './Department';
import {Document} from './Document';
import {BrowserRouter, Route, Switch,NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        React JS Frontend
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Department
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/document">
              Document
            </NavLink>
          </li>
        </ul>
      </nav>

      <Switch>
        
        <Route path='/department' component={Department}/>
        <Route path='/document' component={Document}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
