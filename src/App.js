import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Home from './Home';
//import SignUp from './SignUp';
//import Login from './Login';
//import Messages from './pages/Messages';
//import Tenants from './pages/Tenants';
//import Votings from './pages/Votings';
//import Issues from './pages/Issues';
import Dashboard from './pages/Dashboard';


class App extends React.Component {

  render() {
    return (
      <div className="App">
         <Dashboard />
      </div>
    );
  }
}

export default App;
