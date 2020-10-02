import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {  

  return (
    <Router>
      <div className="App">        
          <Switch>   
            <Route exact path="/">
              <Dashboard />
            </Route>       
            <Route path="/Login">
              <Login />
            </Route>            
          </Switch>  
          <ToastContainer />                        
      </div>
    </Router>
  );
}

export default App;
