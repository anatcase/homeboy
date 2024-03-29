import React from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import { Redirect } from 'react-router-dom'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages//Login';
import Messages from './pages/Messages';
import Tenants from './pages/Tenants';
import Votings from './pages/Votings';
import Issues from './pages/Issues';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation'
import UserDB from './components/UserDB';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
      isLoggedIn: UserDB.IsLoggedIn(),
      // isLoggedIn: null,
      activePage: "Home",
      //userType: null
      userType: UserDB.IsLoggedIn() ? UserDB.GetCurrentUserType() : null
      // allUsers: jsonUsers,
  }

  // this.changeActivePage = this.changeActivePage.bind(this);
  this.handleLogin = this.handleLogin.bind(this);
  this.handleLogout = this.handleLogout.bind(this);
  this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);
  this.handleLogoutError = this.handleLogoutError.bind(this);

  // //Make sure you have all the information you need
  // if ( this.state.isLoggedIn == null) {
  //   // this.state.isLoggedIn = UserDB.IsLoggedIn();
  //   //this.setState(this.state); 
  //   this.setState({isLoggedIn:UserDB.IsLoggedIn()}); 
  // }
  // if (this.state.isLoggedIn && this.state.userType == null) {
  //   this.setState({userType:UserDB.GetCurrentUserType()}); 

  //   // this.state.userType = UserDB.GetCurrentUserType();
  //   //this.setState(this.state); 
  // }
}

handleLogin() {
 // this.state.isLoggedIn = true;
  //Check userType with the DB
  //this.state.userType = UserDB.GetCurrentUserType();

  this.setState({isLoggedIn:true, userType:UserDB.GetCurrentUserType()}); 

  // this.setState(this.state);
}

handleLogout() {
  UserDB.LogOut(this.handleLogoutSuccess, this.handleLogoutError);
}

handleLogoutSuccess() {
  // this.state.isLoggedIn = false;
  // this.state.userType = null;
  // this.setState(this.state);

  this.setState({isLoggedIn:false, userType:null});
}

handleLogoutError() {
}

// changeActivePage(pageName){
// if(pageName === "Dashboard") {
//   this.state.isLoggedIn = true;
// }
//   this.state.activePage = pageName;
//   this.setState(this.state);
// }

  render() {
    const activeUser = this.state.activeUser;

    const signUpDestination = (
      this.state.isLoggedIn? <Redirect to="/Dashboard"/>
      : <SignUp handleLogin={this.handleLogin} />
    );

    const loginDestination = (
      this.state.isLoggedIn? <Redirect to="/Dashboard"/>
      : <Login handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn}/>
    );

    const homeDestination = (
      this.state.isLoggedIn? <Redirect to="/Dashboard"/>
      : <Home />
    );

    const issuesDestination = (
      this.state.isLoggedIn? <Issues activeUser={activeUser} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
      :  <Redirect to="/Login"/>
    );

    const messagesDestination = (
      this.state.isLoggedIn? <Messages activeUser={activeUser} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
      : <Redirect to="/Login"/>
    );

    const dashboardDestination = (
      this.state.isLoggedIn? <Dashboard userType={this.state.userType} activeUser={activeUser} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
      :  <Redirect to="/Login"/>
    );

    const tenantsDestination = (
      this.state.isLoggedIn? <Tenants activeUser={activeUser} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
      :  <Redirect to="/Login"/>
    );

    const votingsDestination = (
      this.state.isLoggedIn? <Votings activeUser={activeUser} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn}/>
      :  <Redirect to="/Login"/>
    );

    const navigation = (
      <Navigation isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
    );

    return (
      <div className="App">
          <Router>
            <Switch>
            <Route exact path="/">
              {navigation}
              {homeDestination}
            </Route>
            <Route path="/Login">
              {loginDestination}
            </Route>
            <Route path="/Issues">
              {navigation}
              {issuesDestination}
            </Route>
            <Route path="/Messages">
              {navigation}
              {messagesDestination}
            </Route>
            <Route path="/SignUp">
              {signUpDestination}
              </Route>
            <Route path="/Dashboard">
              {navigation}
              {dashboardDestination}
            </Route>
            <Route path="/Tenants">
              {navigation}
              {tenantsDestination}
            </Route>
            <Route path="/Votings">
              {navigation}
              {votingsDestination}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
